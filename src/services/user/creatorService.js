const db = require('../../database/connection');

async function userCreator(body){
  try {
    const userMapper =  mapper(body);

    const user = db.collection('users');
    await user.doc().set(userMapper)
   
    return 'user'
  } catch (error) {
    throw error
  }
}

function mapper(params) {
  return {
    name: params.name
  }
}

module.exports = userCreator;
