const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contactSchema = new Schema({
	name: {
        type: String,
        trim: true,
        required: [true, "please provide your name"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "please provide your email"]
    },
    subject: {
        type: String,
       required: [true, "subject field cannot be empty"]
    },
    description: {
        type: String,
        required: true
    }

});


const ContactSchema = mongoose.model('Contact', contactSchema);
module.exports = ContactSchema;