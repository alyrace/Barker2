const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = {...err}
    error.message = err.message

    console.log(err);

    //Incorrect onect formatting from mongoose ObjectId
    if(err.name == 'CastError') {
    const message = `This resouce could not be found with the id of ${err.value}`
    error = new ErrorResponse(message);   
    }

    //Duplicate key in db mongoose error 
    if(err.code === 11000) {
        const message = 'A duplicate field has been entered'
    }

    //mongoose db validation error
    if(err.name == 'ValidationError') {
        message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

module.exports = errorHandler
    

