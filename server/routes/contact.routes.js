const express = require('express');
var contactRouter = express.Router();

const { list, add, updateContact, findById, findByPhone, deleteContact  } = require('../controllers/contact.controller');

contactRouter.get('/list', list);
contactRouter.get('/findById', findByPhone);
contactRouter.get('/findByPhone', findByPhone);
contactRouter.get('/update', updateContact);
contactRouter.get('/add', add);
contactRouter.get('/delete', deleteContact);
