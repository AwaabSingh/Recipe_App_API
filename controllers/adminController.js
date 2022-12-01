const asyncHandler = require('express-async-handler');
const User = require('../models/User');

/**
 * @desc Create a user
 * @route POST
 * @route /api/v1/admin/user
 * @access Public
 */
exports.createUser = asyncHandler(async (req, res) => {
	const { fullname, username, email, password } = req.body;

	const exisitingUser = await User.findOne({ email });

	if (exisitingUser) {
		res.status(400);
		throw new Error('User  already Exists');
	}

	const user = await User.create({
		fullname,
		username,
		email,
		password,
		status: true,
	});

	res.status(201).json({
		_id: user._id,
		fullname: user.fullname,
		email: user.email,
	});
});