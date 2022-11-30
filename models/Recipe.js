const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		coverImage: {
			type: String,
		},
		description: {
			type: String,
			required: true,
		},
		preparationTime: {
			type: String,
		},
		yield: {
			type: String,
		},
		difficulty: {
			type: String,
		},
		utensils: {
			type: [String],
		},
		author: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
		templateId: {
			type: Number,
			required: true,
		},
		ingredients: {
			type: [
				{
					id: { type: String, required: true },
					value: { type: String, required: true },
				},
			],
			required: true,
		},
		steps: {
			type: [
				{
					id: { type: String, required: true },
					value: { type: String, required: true },
				},
			],
			required: true,
		},
		votes: { 
			type: [String],
			 default: []
		 },
		images: {
			type: [
				{
					id: { type: String, required: true },
					name: { type: String, required: true },
					imgUrl: { type: String, required: true },
				},
			],
		},
		status: {
			type: String,
			enum: ['free', 'premium'],
			default: 'free',
		},
		price: {
			type: Number,
			default: 0,
		},
		premiumStatus: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
);
const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
