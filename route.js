const express = require('express');
const router = express.Router();

router.get('/', require('./src/controller/user/createController'));

module.exports = router;
