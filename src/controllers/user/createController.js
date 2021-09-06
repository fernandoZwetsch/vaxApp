const db = require('../../database/connection');

async function request (req, res){
  try {
    const user = db.collection('users');
    await user.doc().set(req.body)
  
    res.status(201).json({ success: true, message: 'User created with success' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = request;
