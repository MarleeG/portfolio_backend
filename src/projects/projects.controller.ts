import { Controller, Get, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('api/project')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('all')
  async getAll() {
    const projects = await this.projectsService.getAll();
    return { projects };
  }

  @Get(':id([0-9a-fA-F]{24})')
  async getProjectById(@Param('id') id: string) {
    const project = await this.projectsService.getProjectById(id);
    return { project };
  }
}
