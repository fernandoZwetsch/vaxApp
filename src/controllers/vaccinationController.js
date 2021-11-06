const vaccinationService = require('../services/vaccinationService');

async function create (req, res){
  try {
    let vaccineId = await vaccinationService.vaccinationCreator(req.body);
    
    res.status(201).json({ success: true, message: 'Vaccine created with success', id: vaccineId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function list (req, res){
  try {
    let vaccinations = await vaccinationService.vaccinationList(req.query);
    
    res.status(201).json({ success: true, message: 'Vaccinations', vaccinations: vaccinations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports.create = create;
module.exports.list = list;

