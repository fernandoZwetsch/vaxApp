const creatorService = require('../../services/user/creatorService');

async function request (req, res){
  try {
    await creatorService.userCreator(req.body);
    
    res.status(201).json({ success: true, message: 'User created with success' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = request;
