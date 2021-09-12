const express = require('express');
const {fileUploadController} = require('../controller/files')
const { protect } = require('../middleware/auth')

const Router = express.Router();

Router.post('/upload', protect, fileUploadController);


module.exports = Router;