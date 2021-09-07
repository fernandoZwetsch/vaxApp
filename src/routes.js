const express = require('express');
const router = express.Router();

//User
router.post('/user', require('./controllers/user/createController'));
// router.put('/user', require('./controllers/user/createController'));
// router.get('/user/:id', require('./controllers/user/createController'));
// router.delete('/user/:id', require('./controllers/user/createController'));

module.exports = router;
