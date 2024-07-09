const fs= require('fs');
const path = require('path');

const products = require('./products.mongo');

async function loadProductsData() {
    try{
        const filePath = path.join(__dirname,'..','..','src','data','dummy.json');
        const rawData = fs.readFileSync(filePath);
        const jsonData = JSON.parse(rawData);

        const productsArray=jsonData.products;

        for(const product of productsArray) {
            await products.updateOne(
                {id: product.id},
                {
                    $set: {
                        id: product.id,
                        catid: product.catid,
                        title: product.title,
                        description: product.description,
                        price: product.price,
                        discountPercentage: product.discountPercentage,
                        rating: product.rating,
                        stock: product.stock,
                        brand: product.brand,
                        thumbnail: product.thumbnail,
                        image: product.image
                    }
                },
                {upsert: true}
            );
            console.log('Saved product: ',product.title);
        }
        const count = (await getAllProducts()).length;
        console.log(`${count} products found!`);

        }  catch(err){
            console.error('Could not save product', err);
        }
    }

async function getAllProducts() {
    return await products.find({}, {
        '_id':0, 
        '__v':0,
    })
}

async function getCategoryProduct(catid) {
    return await products.find({catid: catid}, {
        '_id':0, 
        '__v':0,
    });
}

async function getProduct(id) {
    return await products.find({id: id}, {
        '_id':0,  
        '__v':0,
    })
}

async function searchProducts(query) {
    return await products.find({ title: { $regex: query, $options: 'i' } }, {
        '_id': 0,
        '__v': 0,
    });
}


module.exports = {
    loadProductsData,
    getAllProducts,
    getCategoryProduct,
    getProduct,
    searchProducts,
}