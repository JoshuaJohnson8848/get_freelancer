const userType = require('../models/userType');
const UserType = require('../models/userType');
const { isClient, isFreelancer } = require('../utils/userType');

exports.createUserType = async (req, res, next) => {
  try {
    const { type } = req.body;
    const { userType } = req;
    if (userType == isClient && userType == isFreelancer) {
      const error = new Error('Something went wrong');
      error.status = 422;
      throw error;
    }

    const data = new UserType({
      userType: type,
    });

    const createdUserType = await data.save();
    if (!createdUserType) {
      const error = new Error('UserType Creation Failed');
      error.status = 422;
      throw error;
    }
    res.status(200).json({
      message: 'Succesfully Created User Type',
      userType: createdUserType,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userType } = req;
    if (userType == isClient && userType == isFreelancer) {
      const error = new Error('Something went wrong');
      error.status = 422;
      throw error;
    }

    const deleted = await UserType.findByIdAndDelete(id);
    if (!deleted) {
      const error = new Error('UserType Deletion Failed');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'UserType Deleted', deleted: true });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    const { userType } = req;

    if (userType == isClient && userType == isFreelancer) {
      const error = new Error('Something went wrong');
      error.status = 422;
      throw error;
    }

    const data = await userType.findById(id);
    if (!data) {
      const error = new Error('UserType Not Found');
      error.status = 422;
      throw error;
    }
    data.userType = type;
    const updatedData = await data.save();
    if (!updatedData) {
      const error = new Error('UserType Not Updated');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'UserType Updated', updated: true });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const userTypes = await UserType.find();
    if (!userTypes) {
      const error = new Error('UserType Not Updated');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'UserTypes Fetched', data: userTypes });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
