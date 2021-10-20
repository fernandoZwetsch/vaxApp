const db = require('../database/connection');
const vaccinationModel = require('../models/vaccinationModel');
const userService = require('./userService');
const vaccineService = require('./vaccineService');

async function vaccinationCreator(body){
  try {
    const { refCode, vaccineId } = req.body
    const user = userService.getByRefCode(refCode);
    const vaccine = vaccineService.vaccineShow(vaccineId);

    body.userId = user.id;
    const vaccineMapper = await vaccinationModel.mapper(body);
    const validation = await vaccinationModel.validate(vaccineMapper);
    
    if (validation.length > 0){
      throw new Error(validation.join(", "))
    }
    
    let documentRef = db.collection('vaccines').doc();
    await documentRef.create(vaccineMapper);
  
    return documentRef.id
  } catch (error) {
    throw error
  }
}

module.exports.vaccinationCreator = vaccinationCreator;
