var mongoose = require('mongoose');

var UserSchema = new mongoose.UserSchema({
	username: {
		type: String,
		required: [true, "Name field cannot be blank."]
	},

	email: {
		type: String,
		required: [true,"Email cannot be blank."]
	},

	password: {
		type: String,
		required: [true, "Password cannot be blank."]
	}
})

UserSchema.methods.hashPassword = function(password){
	this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.authenticate = function(password){
	return bcrypt.compareSync(password, this.password);
}

UserSchema.pre('save',function(callback){
	this.hashPassword(this.password);
	callback();
});

mongoose.model('User', UserSchema);