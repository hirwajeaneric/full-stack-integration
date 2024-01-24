const { StatusCodes } = require('http-status-codes');
const UserModel = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        var userExists = await UserModel.findOne({ email: email });
        if (userExists !== null) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "User with this email already exists" });
            return;
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        console.log(hashedPassword);

        var newUser = new UserModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        });

        var savedUser = await newUser.save();

        console.log(savedUser);

        if (savedUser) {
            res.status(201).json({ message: 'Account created!' });
        }

    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
};

const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await UserModel.findOne({ email: email });
        if (!validUser) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Invalid email or password!" });

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Invalid email or password!" });

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);

        const { password: hashedPassword, ...rest } = validUser._doc;

        const expiryDate = new Date(Date.now() + 3600000); // 1 hour

        res
            .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json({ user: rest, token });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
        console.log(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const id = req.query.id;
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(StatusCodes.OK).json({ message: 'User updated!', user: updatedUser });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
};

const list = async (req, res, next) => {
    try {
        const listOfUsers = await UserModel.find({});
        res.status(StatusCodes.OK).json({ users: listOfUsers });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
};

const findById = async (req, res, next) => {
    try {
        const id = req.query.id;
        const foundUser = await UserModel.findById(id);
        res.status(StatusCodes.OK).json({ user: foundUser })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
};

const findByEmail = async (req, res, next) => {
    try {
        const email = req.query.email;
        const foundUser = await UserModel.find({ email: email });
        res.status(StatusCodes.OK).json({ user: foundUser })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const id = req.query.id;
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (deletedUser) {
            res.status(StatusCodes.OK).json({ message: 'User deleted' });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
};


module.exports = {
    signup, signin, list, findById, findByEmail, updateUser, deleteUser
}