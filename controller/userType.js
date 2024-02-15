const UserType = require('../models/userType');

exports.createUserType = async (req, res, next) => {
  try {
    const { type } = req.body;

    const userType = new UserType({
      userType: type,
    });

    const createdUserType = await userType.save();
    if (!createdUserType) {
      const error = new Error('UserType Creation Failed');
      error.status = 422;
      throw error;
    }
    res
      .status(200)
      .json({
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
