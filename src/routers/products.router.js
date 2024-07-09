const express = require('express');

const {httpGetAllProducts, httpGetSearchProducts, httpGetCategoryProduct, httpGetProduct} = require('./products.controller');

const productsRouter = express.Router();

productsRouter.get('/',httpGetAllProducts);
productsRouter.get('/search',httpGetSearchProducts);
productsRouter.get('/:catid',httpGetCategoryProduct);
productsRouter.get('/product/:id',httpGetProduct);

module.exports = productsRouter;


