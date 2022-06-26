const express = require('express');

const router = express.Router();
const user = require('../controller/user');

router.get('/', user.getUserList);
router.get('/:acct', user.getUser);
router.post('/', user.addUser);
module.exports = router;
