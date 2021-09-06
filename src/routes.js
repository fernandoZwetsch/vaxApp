const express = require('express');
const router = express.Router();

router.post('/user', require('./controllers/user/createController'));

module.exports = router;
