const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');

const api = express.Router();

api.use('/products', productsRouter);
api.use('/categories', categoriesRouter);

module.exports = api;