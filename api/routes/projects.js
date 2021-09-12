const express = require('express');

const {
    createProjectController, 
    getAllProjectsController,
    updateProjectController,
    deleteProjectController
} = require('../controller/projects')
const { protect } = require('../middleware/auth');
const Router = express.Router();

Router.post('/', protect, createProjectController);
Router.get('/:id', protect, getAllProjectsController);
Router.put('/:id', protect, updateProjectController);
Router.delete('/:id', protect, deleteProjectController);

module.exports = Router;