const vaccinetionService = require('../services/vaccinationService');

async function create (req, res){
  try {
    let vaccineId = await vaccinetionService.vaccinationCreator(req.body);
    
    res.status(201).json({ success: true, message: 'Vaccine created with success', id: vaccineId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports.create = create;
