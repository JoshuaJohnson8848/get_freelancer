const User = require('../models/users');
const UserType = require('../models/userType');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, userType } = req.body;
    const existedUserType = await UserType.find({ userType: userType });

    if(!existedUserType){
        const error = new Error('No User Type Found');
        error.status = 422;
        throw error;
    }

    const hashedPass = await bcrypt.hash(password, 12)
    if(!hashedPass){
      const error = new Error('Hashing Error');
      error.status = 422;
      throw error;
    }

    const user = new User({
      name: name,
      email: email,
      password: hashedPass,
      userType: existedUserType[0]?._id,
    });

    const createdUser = await user.save();
    if (!createdUser) {
      const error = new Error('Signup Failed');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Signup Successfully', user: createdUser });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existedUser = await User.aggregate([
      { $match: { email: email } },
      {
        $lookup: {
          from: 'usertypes',
          localField: 'userType',
          foreignField: '_id',
          as: 'result',
        },
      },
      {
        $unwind: '$result',
      },
      {
        $project: {
          name: 1,
          email: 1,
          password: 1,
          userType: '$result.userType',
        },
      },
    ]);
    let loadedUser = existedUser[0];
    const hashedPass = await bcrypt.compare(password, loadedUser.password);
    if (!hashedPass) {
      const error = new Error('Password Error');
      error.status = 422;
      throw error;
    }
    const token = await JWT.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id,
        userType: loadedUser.userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    if (!token) {
      const error = new Error('Token Error');
      error.status = 422;
      throw error;
    }
    res
      .status(200)
      .json({ message: 'Logged In Successfully', user: loadedUser });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};
