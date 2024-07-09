const {getAllProducts, getCategoryProduct, getProduct, searchProducts} = require('../models/products.model');


async function httpGetAllProducts(req,res) {
    return res.status(200).json(await getAllProducts());
}
async function httpGetCategoryProduct(req,res) {
    const catid = Number(req.params.catid);
    return res.status(200).json(await getCategoryProduct(catid));
}

async function httpGetProduct(req,res) {  
    const id = Number(req.params.id);
    return res.status(200).json(await getProduct(id)); 
}

async function httpGetSearchProducts(req,res){
    const query = req.query.q;
    return res.status(200).json(await searchProducts(query));

} 


module.exports = { 
    httpGetAllProducts,
    httpGetCategoryProduct,
    httpGetProduct,
    httpGetSearchProducts,
}