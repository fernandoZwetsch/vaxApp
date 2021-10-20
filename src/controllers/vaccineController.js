const vaccineService = require('../services/vaccineService');

async function create (req, res){
  try {
    let vaccineId = await vaccineService.vaccineCreator(req.body);
    
    res.status(201).json({ success: true, message: 'Vaccine created with success', id: vaccineId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function update (req, res){
  try {
    const { id } = req.body

    if (!id) {
      throw new Error("Id is required.")
    }
    
    const vaccine = await vaccineService.vaccineUpdater(id, req.body);
    
    res.status(200).json({ success: true, message: 'Vaccine updated with success', data: vaccine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function show (req, res){
  try {
    const { id } = req.params

    if (!id) {
      throw new Error("Id is required.")
    }

    const vaccine = await vaccineService.vaccineShow(id);
    
    res.status(200).json({ success: true, message: 'Success', data: vaccine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function remove (req, res){
  try {

    const { id } = req.params

    if (!id) {
      throw new Error("Id is required.")
    }

    await vaccineService.vaccineRemove(id);
    
    res.status(200).json({ success: true, message: 'Vaccine removed with success'});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports.create = create;
module.exports.update = update;
module.exports.show = show;
module.exports.remove = remove;
