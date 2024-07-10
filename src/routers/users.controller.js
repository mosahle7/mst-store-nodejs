const {getAllUsers, getUser, addUser} = require('../models/users.model');

async function httpGetAllUsers(req,res) {
    return res.status(200).json(await getAllUsers());
}

async function httpGetUser(req,res) {
    const id = Number(req.params.id);
    return res.status(200).json(await getUser(id));
}

async function httpAddUser(req,res) {
    const user = req.body;
    console.log(user);

    if(!user.name || !user.email || !user.password) {
        return res.status(400).json({
            error: 'Missing required user property',
        });
    }
    await addUser(user);
    return res.status(201).json(user);
}


module.exports = {
    httpGetAllUsers,
    httpGetUser,
    httpAddUser,
}