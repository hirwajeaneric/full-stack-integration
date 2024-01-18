const { Schema, model } = require('mongoose');

const ContactSchema = new Schema({
    fullName: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String,
        unique: true
    },
    phone: {
        require: false,
        type: String
    },
}, { timestamps: true });

module.exports = model('contact', ContactSchema);