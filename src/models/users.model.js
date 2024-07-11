const users = require('./users.mongo');
const bcrypt = require('bcrypt');

const firstUser= {
    id: 1,
    name: "Mohamed Sahle Thappi",
    email: "sahlethappi@gmail.com",
    password: "12345678"
    
}


async function loadUsersData() {
    try{
    const hPassword= await hashPassword(firstUser.password)
    await users.updateOne(
        {id: firstUser.id},
        {
            $set: {
                id: firstUser.id,
                name: firstUser.name,
                email: firstUser.email,
                password: hPassword,
            }
        },
        {upsert: true}
    );
    console.log('Saved user: ', firstUser.name);

    const count = (await getAllUsers()).length;
    console.log(`${count} users found!`);
    } catch(err){
        console.error('Could not save user', err);
    }

}

async function getAllUsers() {
    return await users.find({}, {
        '_id':0,
        '__v':0,
    });
}

async function getUserById(id) {
    return await users.find({id: id}, {
        '_id':0,
        '__v':0,
    });
}

async function getUserByEmail(email) {
    return await users.find({email: email}, {
        '_id':0,
        '__v':0,
    });
}

async function getLatestId() {
    const latestUser = await users
    .findOne()
    .sort('-id');
    console.log('Latest ID: ',latestUser.id);
    return latestUser.id;
}

async function saveUser(newUser) {
    await users.findOneAndUpdate(
        {id: newUser.id},
        newUser,
        {upsert: true}
    )
}

const saltRounds = 10;

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
}

async function addUser(user){
    const existingUser = await getUserByEmail(user.email);
    if (existingUser.length > 0) {
        throw new Error('Email already exists!');
    }
    user.password = await hashPassword(user.password);
    
    const latestId = await getLatestId();
    const newUser = {
        id: latestId + 1,
        name: user.name,
        email: user.email,
        password: user.password
    };
    await saveUser(newUser);
}

async function verifyPassword(enteredPassword, hashedPassword) {
    const match = await bcrypt.compare(enteredPassword, hashedPassword);
    return match;
}

module.exports = {
    loadUsersData,
    getAllUsers,
    getUserById,
    getUserByEmail,
    addUser,
    hashPassword,
    verifyPassword,
};


