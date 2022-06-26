const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const user = require('../controller/user');

router.get('/', auth, user.getUserList);
router.get('/:acct', auth, user.getUser);
router.post('/', user.addUser);

module.exports = router;
