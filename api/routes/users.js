const express = require('express');
const {body, validationResult} = require('express-validator');
const { registerController, loginController, meController, updateMeController } = require('../controller/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();
const checkBody = [
    body('name', "Name is required").not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body(
        'password',
        'Please enter a password of 8 characters or more'
    ).isLength({min: 8})
] 

router.post("/", checkBody, registerController);
router.post("/login", loginController);
router.get("/me", protect, meController);
router.put("/", protect, updateMeController);

module.exports = router;