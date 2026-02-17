import { Controller, Get } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('api/project')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get('images')
  async getPortfolioImages() {
    return this.imagesService.getImages(process.env.AWS_S3_PORTFOLIO_BUCKET || '');
  }

  @Get('connect/images')
  async getConnectImages() {
    return this.imagesService.getImages(process.env.AWS_S3_CONNECT_BUCKET || '');
  }
}
