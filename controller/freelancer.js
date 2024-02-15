const Freelancer = require('../models/freelancers');

exports.createProfile = async (req, res, next) => {
  try {
    const { education, experience, skills } = req.body;
    const userId = req.userId;

    const data = await new Freelancer({
      userId: userId,
      education: education,
      experience: experience,
      skills: skills,
    });
    const createdProfile = await data.save();

    if (!createdProfile) {
      const error = new Error('Profile Not Created');
      error.status = 422;
      throw error;
    }
    res
      .status(200)
      .json({ message: 'Succesfully Created Profile', data: createdProfile });
  } catch (err) {
    console.log(err);
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};
