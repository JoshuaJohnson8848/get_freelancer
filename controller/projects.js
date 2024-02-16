const Project = require('../models/projects')

exports.createProject = async (req, res, next) => {
  try {
    const { title, desc, requirement, budget, duration, languages } = req.body;
    const { userId } = req;
    const data = await new Project({
      userId: userId,
      title: title,
      desc: desc,
      requirement: requirement,
      budget: budget,
      duration: duration,
      languages: languages,
    });
    const createdProject = await data.save();
    if (!createdProject) {
      const error = new Error('Project Not Created');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Project Created', data: createdProject });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    if (!projects.length) {
      const error = new Error('Projects Not Found');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Projects Fetched', data: projects });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      const error = new Error('Project Not Found');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Projects Fetched', data: project });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};

exports.getProjectByUserId = async (req, res, next) => {
  try {
    const { userId } = req;
    const project = await Project.find({ userId: userId });
    if (!project) {
      const error = new Error('Projects Not Found');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Projects Fetched', data: project });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const { title, desc, requirement, budget, duration, languages } = req.body;
    const { id } = req.params;
    const existProject = await Project.findById(id);
    if (!existProject) {
      const error = new Error('Project Not Found');
      error.status = 404;
      throw error;
    }
    existProject.title = title;
    existProject.desc = desc;
    existProject.requirement = requirement;
    existProject.budget = budget;
    existProject.duration = duration;
    existProject.languages = languages;
    const updatedProject = await existProject.save();
    if (!updatedProject) {
      const error = new Error('Project Not Updated');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Project Updated', updated: true });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};

exports.deleteProject = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedProject = await Project.findByIdAndDelete(id);
      if (!deletedProject) {
        const error = new Error('Project Not Deleted');
        error.status = 404;
        throw error;
      }
      res.status(200).json({ message: 'Project Deleted', deleted: true });
    } catch (err) {
      if (!err.status) {
        err.status = 500;
      }
      next();
    }
  };

exports.approve = async (req, res, next) => {
  try {
    const { approve } = req.body;
    const { id } = req.params;
    const data = await Project.findById(id);
    if (!data) {
      const error = new Error('Project Not Found');
      error.status = 404;
      throw error;
    }
    data.approved = approve;
    const approved = await data.save();
    if (!approved) {
      const error = new Error('Project Not Found');
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: 'Approved' });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};