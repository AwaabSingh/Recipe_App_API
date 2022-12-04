const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');

const createContact = asyncHandler(async (req, res) => {
    try{
        const {name, email, subject, description} = req.body;

        const contact = await Contact.create({name, email, subject, description})
        res.status(201).json({id:contact._id, name:contact.name, email:contact.email, description:contact.description })

    }catch(error){
        res.status(400);
		throw new Error(error.message);

    }
});

module.exports={createContact}