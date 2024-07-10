const express = require('express');

const {httpGetAllUsers, httpGetUserById, httpGetUserByEmail, httpAddUser} = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/',httpGetAllUsers);
usersRouter.get('/:id',httpGetUserById);
usersRouter.get('/email/:email',httpGetUserByEmail);
usersRouter.post('/',httpAddUser);

module.exports = usersRouter;