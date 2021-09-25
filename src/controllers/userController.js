const userService = require('../services/userService');

async function create (req, res){
  try {
    let userId = await userService.userCreator(req.body);
    
    res.status(201).json({ success: true, message: 'User created with success', id: userId });
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
    
    const user = await userService.userUpdater(id, req.body);
    
    res.status(200).json({ success: true, message: 'User updated with success', data: user });
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

    const user = await userService.userShow(id);
    
    res.status(200).json({ success: true, message: 'Success', data: user });
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

    await userService.userRemove(id);
    
    res.status(200).json({ success: true, message: 'User removed with success'});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports.create = create;
module.exports.update = update;
module.exports.show = show;
module.exports.remove = remove;
