const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  githubLink: { type: String, required: true },
  deployedLink: { type: String, required: true },
  technologies: {type: Array, required: true},
  projectType: {type: String, required: true},
  imgName: {type: String, required: false}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;