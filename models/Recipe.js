const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
	
	title: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
    utensils: {
		type: [String],
		required: true
	},
    author: {
        type:  mongoose.Schema.ObjectId,
        ref: "User",
	required: true
    },
	isPublished: {
		type: Boolean,
		default: false
	},
   ingredients: {
        type: [String],
	   required: true
    },
  steps: {
        type: [{
			step:{ type: String, required: true},
			text: { type: String, required: true }
		}],
	   required: true
    },
}, {timestamps: true });
const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
