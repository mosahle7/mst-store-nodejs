const express = require('express');

const {httpGetAllUsers, httpGetUser, httpAddUser} = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/',httpGetAllUsers);
usersRouter.get('/:id',httpGetUser);
usersRouter.post('/',httpAddUser);

module.exports = usersRouter;