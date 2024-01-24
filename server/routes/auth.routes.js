const express = require('express');
const userRouter = express.Router();

const { signin, signup, findByEmail, findById, list, updateUser, deleteUser } = require('../controllers/user.controllers');

userRouter.get('/list', list);
userRouter.get('/findById', findById);
userRouter.get('/findByPhone', findByEmail);
userRouter.put('/update', updateUser);
userRouter.post('/signin', signin);
userRouter.post('/signup', signup);
userRouter.delete('/delete', deleteUser);

module.exports = userRouter;