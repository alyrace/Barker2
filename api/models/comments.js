const Comment = require('../models/comment');
const asyncHandler = require('../middleware/async');
const errorHandler = require('../middleware/error');

//create commemt
// @route       POST /api/comment/create
// @access      Private
exports.createCommentController = asyncHandler(async(req, res, next)=>{
    const comment = await Comment.create({
    ...req.body,
    createdBy: req.user._id,
  });

  let populatedComment = await Comment.findById(comment._id).populate({
    path: "createdBy",
    select: "name photo",
  });

  res.status(200).json({
    success: true,
    data: populatedComment,
  });
});

//update comments
// @route       PUT /api/comment/:id
// @access      Private
exports.updateCommentController = asyncHandler(async(req, res, next) =>{
    const comment = await Comment.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).populate({
    path: "createdBy",
    select: "name photo",
  });

  res.status(200).json({
    success: true,
    data: comment,
  });
});
//delete comments
// @route       DELETE /api/comment/:id
// @access      Private
exports.deleteCommentController = asyncHandler(async(req, res, next) => {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    //comment.remove();
    res.status(200).json({
        success: true,
        data: null,
    });
});