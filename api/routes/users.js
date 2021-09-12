const express = require('express');
//const {body, validationResult} = require('express-validator');
const { registerController, loginController, meController, updateMeController } = require('../controller/auth');
const { getBoardForUserController } = require('../controller/boards');
const { protect } = require('../middleware/auth');

const Router = express.Router();
/*const checkBody = [
    body('name', "Name is required").not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body(
        'password',
        'Please enter a password of 8 characters or more'
    ).isLength({min: 8})
]*/ 

Router.post("/register", registerController);
Router.post("/login", loginController);
Router.get("/me", protect, meController);
Router.put("/", protect, updateMeController);

module.exports = Router;