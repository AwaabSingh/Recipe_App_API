const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
	
	title: {
		type: String,
		required: true
	},
	coverImage: {
		type: String,
	},
	description: {
		type: String,
		required: true
	},
    utensils: {
		type: [String],
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
        type: [{
			id:{ type: String, required: true },
			value:{ type: String, required: true},
		}],
	   required: true
    },
  steps: {
        type: [{
			id:{ type: String, required: true},
			value:{ type: String, required: true},
		}],
	   required: true
    },
	  votes: { type: [String], default: [] },
	  images: {
		 type: [{
			id:{ type: String, required: true},
			name: { type: String, required: true },
			imgUrl: { type: String, required: true }
		}],
	  }
}, {timestamps: true });
const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
