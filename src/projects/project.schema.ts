import mongoose, { Schema } from 'mongoose';

export interface Project {
  name: string;
  description: string;
  githubLink: string;
  deployedLink: string;
  technologies: string[];
  projectType: string;
  imgName?: string;
}

const projectSchema = new Schema<Project>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  githubLink: { type: String, required: true },
  deployedLink: { type: String, required: true },
  technologies: { type: [String], required: true },
  projectType: { type: String, required: true },
  imgName: { type: String, required: false },
});

export const ProjectModel =
  mongoose.models.Project || mongoose.model<Project>('Project', projectSchema);
