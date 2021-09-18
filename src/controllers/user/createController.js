const creatorService = require('../../services/userService');

async function request (req, res){
  try {
    let userId = await creatorService.userCreator(req.body);
    
    res.status(201).json({ success: true, message: 'User created with success', id: userId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = request;
