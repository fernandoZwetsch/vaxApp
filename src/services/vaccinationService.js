const db = require('../database/connection');
const vaccinationModel = require('../models/vaccinationModel');
const userService = require('./userService');
const vaccineService = require('./vaccineService');

async function vaccinationCreator(body){
  try {
    const { refCode, vaccineId } = body
    const user = await userService.getByRefCode(refCode);
    const vaccine = await vaccineService.vaccineShow(vaccineId);

    body.userId = user.id;
    const vaccineMapper = await vaccinationModel.mapper(body);
    const validation = await vaccinationModel.validate(vaccineMapper);
    
    if (validation.length > 0){
      throw new Error(validation.join(", "))
    }
    
    let documentRef = db.collection('vaccinations').doc();
    await documentRef.create(vaccineMapper);
  
    return documentRef.id
  } catch (error) {
    throw error
  }
}

async function vaccinationList(params){
  try {
    const { refCode } = params
    const user = await userService.getByRefCode(refCode);

    if (!user){
      throw new Error("User not found.")
    }

    let collection = db.collection('vaccinations');
    const vaccinations = await collection.where('userId', '==', user.id).get()
    
    let collectionVaccines = db.collection('vaccines');
    const vac = await vaccinations.docs.map(async (doc) => {
      let vaccination = doc.data()
      let id = vaccination.vaccineId
      const vaccine = await collectionVaccines.doc(id).get();
      vaccination.vaccine = await vaccine.data();
      
      return vaccination
    });
    
    return await Promise.all(vac)
  } catch (error) {
    throw error
  }
}

module.exports.vaccinationCreator = vaccinationCreator;
module.exports.vaccinationList = vaccinationList;
