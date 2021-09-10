const express = require('express');
const { searchUserByEmailController } = require('../controller/search');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get("/", protect, searchUserByEmailController);

module.exports = router;



