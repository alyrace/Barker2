const express = require('express');

const {
    createBoardController, 
    getAllBoardsForUserController,
    getBoardForUserController,
    updateBoardController,
    deleteBoardController
} = require('../controller/boards');

const { protect } = require('../middleware/auth');

const Router = express.Router();

Router.get('/:id', protect, getBoardForUserController);
Router.get('/', protect, getAllBoardsForUserController);
Router.post('/', protect, createBoardController);
Router.put('/:id', protect, updateBoardController);
Router.delete('/:id', protect, deleteBoardController);

module.exports = Router;