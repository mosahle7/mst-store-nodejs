const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    catid: {
        type: Number,
        required: true
    },
    title: {
        type:String,
        required: true,
    },
    
    description: {
        type:String,
    },
    price: {
        type: Number,
        required: true
    },
    discountPercentage:{
        type: Number,
    },
    rating:{
        type: Number,
    },
    stock: {
        type: Number,
    },    
    brand: {
        type: String,
    },
    thumbnail: {
        type: String
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);