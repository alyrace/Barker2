const Project = require('../models/project');
const Card = require('../models/card');
const asyncHandler = require('../middleware/async');
const errorHandler = require('../middleware/error');

//create project
// @route       POST /api/project/create
// @access      Private
exports.createProjectController = asyncHandler(async(req, res, next) => {
    const project = await Project.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(200).json({
    success: true,
    data: project,
  });
})

//get all projects
// @route       GET /api/project/:id
// @access      Private
exports.getAllProjectsController = asyncHandler(async(req, res, next) =>{
    console.log(req.params);
    const project = await Project.find({ boardId: req.params.id }).populate({
        path: "cards",
        select: "title listId position members coverPhoto labels",
        populate: {
        path: "members",
        select: "name photo",
        },
    });

    res.status(200).json({
        success: true,
        data: project,
    });
});

//update single project
// @route       PUT /api/project/:id
// @access      Private
exports.updateProjectController = asyncHandler(async(req, res, next) => {
    const project = await Project.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: project,
  });
});
//delete single board
// @route       DELETE /api/project/:id
// @access      Private

exports.deleteProjectController = asyncHandler(async(req, res, next) =>{
    await Card.deleteMany({ listId: req.params.id });

    await Project.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        data: null,
    });
});