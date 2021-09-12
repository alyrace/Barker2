const express = require('express');

const {
    createCardController, 
    getCardController,
    reorderCardController,
    updateCardController,
    deleteCardController
} = require('../controller/cards')
const { protect } = require("../middleware/auth")

const Router = express.Router();

Router.post('/', protect, createCardController);
Router.put('/reorder', protect, reorderCardController);
Router.get('/:id', protect, getCardController);
Router.put('/:id', protect, updateCardController);
Router.delete('/:id', protect, deleteCardController);

module.exports = Router;