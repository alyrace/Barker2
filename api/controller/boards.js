const User = require('../models/user');
const Board = require('../models/board');
const asyncHandler = require('../middleware/async');
const errorHandler = require('../middleware/error');

//create boards
// @route       POST /api/board/create
// @access      Private
exports.createBoardController = asyncHandler(async (req, res, next) =>{
    const user = req.user;
    const {name, avatar} = req.body;
    if(!name) {
        return next(new errorHandler('Please add a name to this board', 500));
    }

    //board creation
    const board = await Board.create({
        name,
        avatar,
        createdBy: user._id
    })
    res.status(200).json({
        success: true,
        data: board
    })
})
// @desc get list of boards
// @route       GET /api/board
// @access      Private
exports.getAllBoardsForUserController = asyncHandler(async (req, res, next) =>{
    const user = req.user;
    const board = await Board.find({
        $or: [
            {createdBy: user._id},
            {members:user._id}
        ]
    }).populate({
        path: 'members',
        select: 'name photo email',
    }).populate({
        path: 'createdBy',
        select: 'name photo email', 
    });
    res.status(200).json({
        success: true,
        data: board,
    })
})
//@desc get single board fro member or owner
// @route       GET /api/board/
// @access      Private
exports.getBoardForUserController =  asyncHandler(async (req, res, next) => {
    const user = req.user;
    const board = await Board.findById(req.params.id)
        .populate({
            path: 'members',
            select: 'name photo email',
        })
        .populate({
            path: 'createdBy',
            select: 'name photo email',
        })

        //check of board belongs to user or member
        if(user._id.toString() !== board.createdBy._id.toString &&
            board.members.filter((mem) => mem._id === user._id.toString().length > 0)
            ){
                return next(new errorHandler('You do not have permission to access to this board', 401))
        }
        res.status(200).json({
            success: true,
            data: board,
        })
})
//@desc update single board
// @route       PUT /api/board/:id
// @access      Private
exports.updateBoardController = asyncHandler(async (req, res, next) => {
    const user = req.user;
    
    let board = await Board.findById(req.params.id);
    if(!board) {
        return next(new errorHandler(`No board with id ${req.params.id}, 404`))
    }
    if(board.createdBy.toString() !== req.user._id.toString() &&
        board.members.includes(req.user._id.toString())){
            return next(new errorHandler(`User ${user._id} does not have permission to update board`, 401))
        }
        //update board
    board = await Board.findByIdAndUpdate({_id:req.user._id}, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).json({
            success: true,
            data: board,
        })
})
//@desc delete single board
// @route       DELETE /api/board/:id
// @access      Private
exports.deleteBoardController = asyncHandler(async (req, res, next) => {
    const user = req.user;
    
    let board = await Board.findById(req.params.id)
    if(!board) {
        return next(new errorHandler(`No board with id ${req.params.id}, 404`))
    }

    if(board.createdBy.toString() !== req.user._id.toString() &&
        board.members.includes(req.user._id.toString())){
            return next(new errorHandler(`User ${user._id} does not have permission to delete board`, 401))
        }
    board.remove();

    res.status(200).json({
            success: true,
            data: {},
        })    
})