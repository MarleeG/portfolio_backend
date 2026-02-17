import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<{ method: string; originalUrl: string }>();
    const res = ctx.getResponse<{
      status: (code: number) => { json: (body: unknown) => void };
    }>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();

      if (status >= 500) {
        console.error(`[${req.method}] ${req.originalUrl}\n`, exception);
      }

      res.status(status).json(response);
      return;
    }

    console.error(`[${req.method}] ${req.originalUrl}\n`, exception);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
