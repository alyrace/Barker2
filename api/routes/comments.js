const express = require('express');

const {
    createCommentController, 
    updateCommentController,
    deleteCommentController
} = require('../controller/comments')
const { protect } = require('../middleware/auth');

const Router = express.Router();

Router.post('/', protect, createCommentController);
Router.put('/:id', protect, updateCommentController);
Router.delete('/:id', protect, deleteCommentController);

module.exports = Router;