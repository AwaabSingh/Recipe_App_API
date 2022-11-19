const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const stepSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
    }
}, {timestamps: true });

const Step = mongoose.model('Step', stepSchema);
module.exports = Step;