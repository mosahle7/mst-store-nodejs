const users = require('./users.mongo');

const firstUser= {
    id: 1,
    name: "Mohamed Sahle Thappi",
    email: "sahlethappi@gmail.com",
    password: "12345678"
    
}

async function loadUsersData() {
    try{
    await users.updateOne(
        {id: firstUser.id},
        {
            $set: {
                id: firstUser.id,
                name: firstUser.name,
                email: firstUser.email,
                password: firstUser.password
            }
        },
        {upsert: true}
    );
    console.log('Saved user', firstUser.name);

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

async function getUser(id) {
    return await users.find({id: id}, {
        '_id':0,
        '__v':0,
    });
}

async function getLatestId() {
    const latestUser = await users
    .findOne()
    .sort('-id');
    console.log('Latest ID: 'latestUser.id);
    return latestUser.id;
}

async find saveUser(newUser) {
    await users.findOneAndUpdate(
        {id: newUser.id},
        newUser,
        {upsert: true}
    )
}

async function addUser(user){
    const latestId = await getLatestId();
    const newUser = {
        id: latestId + 1,
        name: user.name,
        email: user.email,
        password: user.password
    };
    await saveUser(newUser);
}



module.exports = {
    loadUsersData,
    getAllUsers,
    getUser,
    addUser
};


