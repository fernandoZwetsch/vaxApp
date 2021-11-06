const db = require('../database/connection');
const vaccineModel = require('../models/vaccineModel');
const validationSchemaService = require('./validationSchemaService');

async function vaccineCreator(body){
  try {
    const vaccineMapper = await vaccineModel.mapper(body);
    const validation = await vaccineModel.validate(vaccineMapper);
    
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

async function vaccineUpdater(id, vaccine){
  try {
    let collection = db.collection('vaccines');

    const vaccineFind = await collection.doc(id).get();
    const current_vaccine = vaccineFind.data();

    if (!current_vaccine){
      throw new Error("vaccine not found")
    }

    const vaccineMapper = await vaccineModel.mapper(vaccine);
    const vaccineUpdated = await validationSchemaService.overwritingEmpty(current_vaccine, vaccineMapper);

    await collection.doc(id).update(vaccineUpdated);

    const result = await collection.doc(id).get();

    return await result.data();
  } catch (error) {
    throw error
  }
}

async function vaccineShow(id){
  try {
    let collection = db.collection('vaccines');
    const vaccineFind = await collection.doc(id).get();
    const vaccine = await vaccineFind.data();

    if (!vaccine){
      throw new Error("vaccine not found")
    }

    return vaccine
  } catch (error) {
    throw error
  }
}

async function vaccineRemove(id){
  try {
    let collection = db.collection('vaccines');
    const vaccineFind = await collection.doc(id).get();
    const vaccine = await vaccineFind.data();

    if (!vaccine){
      throw new Error("Vaccine not found")
    }

    await collection.doc(id).delete();

    return
  } catch (error) {
    throw error
  }
}

async function vaccineList(){
  try {
    let collectionVaccines = db.collection('vaccines');
 
    const vaccines = await collectionVaccines.get()
    return vaccines.docs.map(doc => doc.data());

  } catch (error) {
    throw error
  }
}

module.exports.vaccineCreator = vaccineCreator;
module.exports.vaccineUpdater = vaccineUpdater;
module.exports.vaccineShow = vaccineShow;
module.exports.vaccineRemove = vaccineRemove;
module.exports.vaccineList = vaccineList;
