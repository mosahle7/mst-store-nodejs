const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); 

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@products.t2ak7mi.mongodb.net/?retryWrites=true&w=majority&appName=products`;

mongoose.connection.once('open', () => {
    console.log('MongoDB Connection ready!'); 
});

mongoose.connection.on('error', (err) => {
    console.error(err);
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URL, {
    });
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports={
    mongoConnect,
    mongoDisconnect
}