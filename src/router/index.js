const express = require('express');

const userRoute = require('./user');
const authRoute = require('./auth');

const router = express.Router();
router.use('/user', userRoute);
router.use('/auth', authRoute);
module.exports = router;
