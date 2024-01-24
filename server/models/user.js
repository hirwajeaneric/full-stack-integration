const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    firstName: {
        require: true,
        type: String
    },
    lastName: {
        require: true,
        type: String,
    },
    email: {
        require: true,
        type: String,
        unique: true
    },
    password: {
        require: true,
        type: String
    },
}, { timestamps: true });

module.exports = model('user', UserSchema);