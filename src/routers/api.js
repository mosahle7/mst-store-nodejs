const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');

const api = express.Router();

api.use('/products', productsRouter);
api.use('/categories', categoriesRouter);
api.use('/users', usersRouter);

module.exports = api;