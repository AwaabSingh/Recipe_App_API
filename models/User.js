const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ('bcrypt')
const crypto = require('crypto')




const userSchema = new Schema({
	fullname: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	resetPasswordToken: String,
    resetPasswordExpire: Date
}, {timestamps: true });

userSchema.pre('save', async function(next){
    try{
     
        if(!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 12);
    } catch(e){
    next(e)
    }
})

// Match user password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password reset token 
userSchema.methods.getResetPasswordToken = function () {
  // generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

    // set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

    return resetToken
};


const User = mongoose.model('User', userSchema);
module.exports = User;


