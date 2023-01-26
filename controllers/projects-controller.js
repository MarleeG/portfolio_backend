const db = require("../models/projectSchema");

const getAll = async (req, res, next) => {
  let projects;
  try {
    projects = await db.find({});
  } catch (err) {
    return next(err);
  }

  res.json({
    projects: projects.map((project) => project.toObject({ getters: false })),
  });
};

const getProjectById = async (req, res, next) => {
  const projectId = req.params.id;
  let project;
  try {
    project = await db.findById(projectId);
  } catch (err) {
    return next(err);
  }

  res.status(200).json({ project: project.toObject({ getters: false }) });
};

exports.getAll = getAll;
exports.getProjectById = getProjectById;