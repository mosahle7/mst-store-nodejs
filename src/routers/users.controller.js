const {getAllUsers, getUserById, getUserByEmail, addUser} = require('../models/users.model');

async function httpGetAllUsers(req,res) {
    return res.status(200).json(await getAllUsers());
}

async function httpGetUserById(req,res) {
    const id = Number(req.params.id);
    return res.status(200).json(await getUserById(id));
}

async function httpGetUserByEmail(req,res) {
    const email = req.params.email;
    return res.status(200).json(await getUserByEmail(email));
}
async function httpAddUser(req,res) {
    const user = req.body;
    console.log(user); 


    if(!user.name || !user.email || !user.password) {
        return res.status(400).json({
            error: 'Missing required user property',
        });
    }

    try {
    await addUser(user);
    return res.status(201).json(user);
    } catch(error) {
        if (error.message === 'Email already exists!') {
            return res.status(400).json({
                error: 'Email already exists!',
            })
        }

        return res.status(500).json({
            error: 'Internal server error',
        })
    }
}


module.exports = {
    httpGetAllUsers,
    httpGetUserById,
    httpGetUserByEmail,
    httpAddUser,
}