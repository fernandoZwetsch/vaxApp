const db = require('../database/connection');
const userModel = require('../models/userModel');

async function userCreator(body){
  try {
    const userMapper = await userModel.mapper(body);

    if (userMapper.error_messages.length > 0){
      throw new Error(userMapper.error_messages.join(", "))
    }
    
    let documentRef = db.collection('users').doc();
    await documentRef.create(userMapper.model);
  
    return documentRef.id
  } catch (error) {
    throw error
  }
}

module.exports.userCreator = userCreator;
