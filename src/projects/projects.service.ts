import { Injectable } from '@nestjs/common';
import { ProjectModel } from './project.schema';

@Injectable()
export class ProjectsService {
  async getAll() {
    const projects = await ProjectModel.find({});
    return projects.map((project) => project.toObject({ getters: false }));
  }

  async getProjectById(id: string) {
    const project = await ProjectModel.findById(id);
    return project!.toObject({ getters: false });
  }
}
