const express = require('express');
const contactRouter = express.Router();

const { list, add, updateContact, findById, findByPhone, deleteContact  } = require('../controllers/contact.controller');

contactRouter.get('/list', list);
contactRouter.get('/findById', findById);
contactRouter.get('/findByPhone', findByPhone);
contactRouter.put('/update', updateContact);
contactRouter.post('/add', add);
contactRouter.delete('/delete', deleteContact);

module.exports = contactRouter;