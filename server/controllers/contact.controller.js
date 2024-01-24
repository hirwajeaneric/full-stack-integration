const { StatusCodes } = require('http-status-codes');
const ContactModel = require('../models/contact');

const add = async (req, res, next) => {
    try {
        console.log("Body data:");
        console.log(req.body);

        var savedContact = await ContactModel.create(req.body);
        console.log("Saved contact:");
        console.log(savedContact);
        
        res.status(StatusCodes.CREATED).json({ message: 'Contact successfully added!', contact: savedContact });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
};

const updateContact = async (req, res, next) => {
    try {
        const id = req.query.id;
        const updatedContact = await ContactModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(StatusCodes.OK).json({ message: 'Contact updated!', contact: updatedContact});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
};

const list = async (req, res, next) => {
    try {
        const listOfContacts = await ContactModel.find({});
        res.status(StatusCodes.OK).json({ contacts: listOfContacts});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
};

const findById = async (req, res, next) => {
    try {
        const id = req.query.id;
        const foundContact = await ContactModel.findById(id);
        res.status(StatusCodes.OK).json({ contact: foundContact })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
};

const findByPhone = async (req, res, next) => {
    try {
        const phone = req.query.phone;
        const foundContact = await ContactModel.find({ phone: phone });
        res.status(StatusCodes.OK).json({ contact: foundContact })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const id = req.query.id;
        const deletedContact = await ContactModel.findByIdAndDelete(id);
        if (deletedContact) {
            res.status(StatusCodes.OK).json({ message: 'Contact deleted' });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    }
};


module.exports = {
    add, list, findById, findByPhone, updateContact, deleteContact
}