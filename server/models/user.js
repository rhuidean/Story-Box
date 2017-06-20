var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Idea = mongoose.model('Idea');
var Story = mongoose.model('Story');
var Comment = mongoose.model('Comment');
var Reply = mongoose.model('Reply');

var UserSchema = new mongoose.Schema({
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
	},

	stories: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Story'
	}],

	ideas: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Idea'
	}],

	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}],

	replies: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Reply'
	}],

	friends: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
},{timestamps: true})

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