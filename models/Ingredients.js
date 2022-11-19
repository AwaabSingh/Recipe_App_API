const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ingredientSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true,
		unique: true
	}
}, {timestamps: true });


const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;
