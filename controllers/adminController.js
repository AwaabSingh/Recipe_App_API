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

/**
 * @desc Update user
 * @route PUT
 * @route /api/user/:id
 * @access Private/Admin
 */
exports.UpdateUserByAdmin = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.fullname = req.body.fullname || user.fullname;
		user.username = req.body.username || user.username;
		user.isAdmin = req.body.isAdmin;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});
