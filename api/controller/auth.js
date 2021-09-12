const User = require('../models/user');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
//const {validationResult} = require('express-validator');
//const gravatar = require('gravatar');

//GET REGISTER USER

// @desc        Register user
// @route       POST /api/users/register
// @access      Public
exports.registerController = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return next(
      new ErrorResponse(`Please provide an email, name and password`, 400)
    );
  }

  const userCheck = await User.findOne({ email });

  if (userCheck) {
    return next(new ErrorResponse(`Email already taken!`, 400));
  }
  //create user
  const user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 200, res);
});

//Login
exports.loginController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validate email and password
  if (!email || !password) {
    return next(new ErrorResponse(`Please provide an email and password`, 400));
  }

  //check for user
  const user = await User.findOne({ email }).select("+password"); // using + to override default select: false on model

  if (!user) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }

  //check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }

  sendTokenResponse(user, 200, res);
});

//Get current user
// @desc        Get current logged in user
// @route       GET /api/users/me
// @access      Private

exports.meController = asyncHandler(async (req, res, next) => {
        const user = await User.findById(req.user._id);
         res.status(200).json({
            success: true,
            data: user,
            });
});

//update user
// @desc        Update logged in user
// @route       PUT /api/users
// @access      Private
exports.updateMeController = asyncHandler(async (req, res, next) => {
  const { password, ...restOfProps } = req.body;

  const updatedMe = await User.findOneAndUpdate(
    { _id: req.user._id },
    restOfProps,
    {
      new: true,
      runValidators: true,
    }
  );

  if (req.body.password) {
    const user = await User.findById(req.user._id).select("+password");
    user.password = req.body.password;
    await user.save();

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      data: user,
      token: token,
    });
  } else {
    res.status(200).json({
      success: true,
      data: updatedMe,
    });
  }
});


