import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ImagesController } from './images/images.controller';
import { ImagesService } from './images/images.service';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsService } from './projects/projects.service';

@Module({
  imports: [],
  controllers: [AppController, ProjectsController, ImagesController],
  providers: [ProjectsService, ImagesService],
})
export class AppModule {}
