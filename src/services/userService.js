const db = require('../database/connection');
const userModel = require('../models/userModel');
const validationSchemaService = require('../services/validationSchemaService');
const bcrypt = require('bcryptjs');

async function userCreator(body){
  try {
    body['refCode'] = userModel.generateCode('');
    let userMapper = await userModel.mapper(body);
    const validation = await userModel.validate(userMapper);

    if (validation.length > 0){
      throw new Error(validation.join(", "))
    }

    const hash = await bcrypt.hash(userMapper['password'], 10)
    userMapper['password'] = hash;
    
    let documentRef = db.collection('users').doc();
    await documentRef.create(userMapper);
  
    return documentRef.id
  } catch (error) {
    throw error
  }
}

async function userUpdater(id, user){
  try {
    let collection = db.collection('users');

    const userFind = await collection.doc(id).get();
    const current_user = userFind.data();

    if (!current_user){
      throw new Error("User not found")
    }

    const userMapper = await userModel.mapper(user);
    const userUpdated = await validationSchemaService.overwritingEmpty(current_user, userMapper);

    await collection.doc(id).update(userUpdated);

    const result = await collection.doc(id).get();

    return await result.data();
  } catch (error) {
    throw error
  }
}

async function userShow(id){
  try {
    let collection = db.collection('users');
    const userFind = await collection.doc(id).get();
    const user = await userFind.data();

    if (!user){
      throw new Error("User not found")
    }

    return user
  } catch (error) {
    throw error
  }
}

async function getByRefCode(refCode){
  try {
    let collection = db.collection('users');
    const userFind = await collection.where('refCode', '==', refCode).get();
    const user = userFind.docs[0];

    if (!user){
      throw new Error("User not found")
    }

    return user
  } catch (error) {
    throw error
  }
}

async function userRemove(id){
  try {
    let collection = db.collection('users');
    const userFind = await collection.doc(id).get();
    const user = await userFind.data();

    if (!user){
      throw new Error("User not found")
    }

    await collection.doc(id).delete();

    return
  } catch (error) {
    throw error
  }
}

module.exports.userCreator = userCreator;
module.exports.userUpdater = userUpdater;
module.exports.userShow = userShow;
module.exports.getByRefCode = getByRefCode;
module.exports.userRemove = userRemove;
