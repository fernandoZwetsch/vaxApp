const express = require('express');
const router = express.Router();

//User
const user = require('./controllers/userController')
router.post('/user', user.create);
router.put('/user', user.update);
router.get('/user/:id', user.show);
router.delete('/user/:id', user.remove);

//login
router.post('/login', function (req, res) {
    const { email, password} = req.body;
   
    if (!email) {
      res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    if (!password) {
      res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }

    res.status(200).json({
      success: true,
      token: 'FB8CADBEFC2E65A9BB3C11311D823EB375564BD171F3E62C3685BBFB8353663D6AB3AD0FB45A56DBAB191AF78BFC14D0B175B15B35D3120DE1D0A417AB42B17B'
    });
});

//vaccine
const vaccine = require('./controllers/vaccineController')
router.post('/vaccine', vaccine.create);
router.put('/vaccine', vaccine.update);
router.get('/vaccine/:id', vaccine.show);
router.delete('/vaccine/:id', vaccine.remove);

//vaccination
const vaccination = require('./controllers/vaccinationController')
router.post('/vaccination', vaccination.create);

module.exports = router;
