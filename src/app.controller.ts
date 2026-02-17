import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return { message: "Let's party!" };
  }

  @Get('api/health')
  getHealth() {
    return { status: 'ok' };
  }
}
