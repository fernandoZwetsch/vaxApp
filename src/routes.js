const express = require('express');
const authMiddleware = require('./middlewares/auth');
const auth = require('./controllers/authController');
const user = require('./controllers/userController');
const vaccine = require('./controllers/vaccineController');
const vaccination = require('./controllers/vaccinationController');

const router = express.Router();
//login
router.post('/login', auth.auth);
router.post('/user', user.create);

router.use(authMiddleware);
//User
router.put('/user', user.update);
router.get('/user/:id', user.show);
router.delete('/user/:id', user.remove);

//vaccine
router.post('/vaccine', vaccine.create);
router.put('/vaccine', vaccine.update);
router.get('/vaccine/:id', vaccine.show);
router.get('/vaccines', vaccine.list);
router.delete('/vaccine/:id', vaccine.remove);

//vaccination
router.post('/vaccination', vaccination.create);
router.get('/vaccinations', vaccination.list);

module.exports = router;
