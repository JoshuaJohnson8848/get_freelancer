const Freelancer = require('../models/freelancers');
const changeObjectId = require('../utils/helper');
const User = require('../models/users');

exports.createProfile = async (req, res, next) => {
  try {
    const { education, experience, skills } = req.body;
    const { userId } = req;

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
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const { userId, userType } = req;
    const data = await Freelancer.find({ userId: userId });
    if (!data.length) {
      res
        .status(200)
        .json({ message: 'Profile Not Created', profileExist: false });
      return;
    }
    const existData = await Freelancer.aggregate([
      { $match: { userId: changeObjectId(userId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userData',
        },
      },
      {
        $unwind: {
          path: '$userData',
        },
      },
      {
        $project: {
          userId: '$userData._id',
          email: '$userData.email',
          name: '$userData.name',
          education: 1,
          experience: 1,
          skills: 1,
          rating: 1,
        },
      },
    ]);
    res.status(200).json({message: "Successfully Fetched", profile: true, data: existData[0]})
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email, education, skills, experience } = req.body;
    const { userId } = req;
    const existProfile = await Freelancer.findOne({ userId: userId });
    if (!existProfile) {
      const error = new Error('Profile Not Found');
      error.status = 404;
      throw error;
    }
    const existedUser = await User.findById(userId);
    if (!existedUser) {
      const error = new Error('User Not Found');
      error.status = 404;
      throw error;
    }
    existedUser.name = name;
    existedUser.email = email;
    existProfile.education = education;
    existProfile.skills = skills;
    existProfile.experience = experience;
    const updatedProfile = await existProfile.save();
    const updatedUser = await existedUser.save();

    if (!(updatedProfile || updatedUser)) {
      const error = new Error('Something Went Wrong');
      error.status = 422;
      throw error;
    }
    res
      .status(200)
      .json({
        message: 'Profile Updated Successfully',
        updated: true
      });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};
