const jwt = require('jsonwebtoken');
const config = require('config');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');

//protect route
exports.protect = asyncHandler (async (req, res, next) => {
    let token; 
    if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
      //allows user to grant access to something
    token = req.headers.authorization.split(" ")[1];
    //only also single user auth
    //token= req.header('x-auth-token');
  }
    //check if token exists
    if(!token) {
        return next(new ErrorResponse("Not authorized to access this route, no token provided", 401))
    }
    //it it does exist try to verify
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //Req.user = decoded.user;
        req.user = await User.findById(decoded.id);
        next();
    } catch(err) {
      return next(new ErrorResponse("Not authorized to access this route, token not valid", 401));  
    }

});