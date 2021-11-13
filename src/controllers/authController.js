const bcrypt = require('bcryptjs');
const db = require('../database/connection');
const jwt = require('jsonwebtoken');

async function auth (req, res){
  try {
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

    let collection = db.collection('users');
    const userFind = await collection.where('email', '==', email).get();
    const userPromoise = await userFind.docs.map(async (doc) => { 
      return { doc: doc.data(), ref: doc.ref._path }
     });
    const users =  await Promise.all(userPromoise);
    const userId = users[0]['ref']['segments'][1]
    let user =  users[0]['doc'];

    if(!user)
      res.status(400).json({ success: false, message: 'User not found' });

    if (!await bcrypt.compare(password, user.password)) {
      res.status(400).json({ success: false, message: 'Invalid password' });
    }
    user.password = undefined;
    user.id = userId;

    const token = jwt.sign({ id: userId, refCode: user.refCode }, 'vax-app', {
      expiresIn: 86400
    });

    res.status(200).json({
      success: true,
      user: user,
      token: token
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
}


module.exports.auth = auth;
