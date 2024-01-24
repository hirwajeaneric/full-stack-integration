const express = require('express');
const userRouter = require('./auth.routes');
const contactRouter = require('./contact.routes');

const allRouters = express.Router();

allRouters.use('/auth', userRouter);
allRouters.use('/contact', contactRouter);

module.exports = allRouters;
