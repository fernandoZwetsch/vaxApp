const express = require('express');
const router = express.Router();

//User
const user = require('./controllers/userController')
router.post('/user', user.create);
router.put('/user', user.update);
router.get('/user/:id', user.show);
router.delete('/user/:id', user.remove);

module.exports = router;
