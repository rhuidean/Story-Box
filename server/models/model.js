var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


//Cannot overwrite `User` model once compiled. -> two models with same name
//Build Schemas

//UserSchema
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

//StorySchema
var StorySchema = new mongoose.Schema({
	
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

	storykeywords: [{
		type: String,
		required: [true, "Key words cannot be blank"]
	}],

	ideas: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Idea'
	}]


}, {timestamps: true})

//IdeaSchema
var IdeaSchema = new mongoose.Schema({

	user: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'User'
	},

	story: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Story'
	},

	title: {
		type: String
	},

	description: {
		type: String
	},

	image: {
		type: String
	},

	source: {
		type: String
	},

	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}]

}, {timestamps: true})

//CommentSchema
var CommentSchema = new mongoose.Schema({

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

	story: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Story'
	},

	idea: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Idea'
	},

	comment: {
		type: String,
		required: [true, 'Comment cannot be blank.']
	},

	replies: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Reply'
	}]

}, { timestamps: true});

//ReplySchema
var ReplySchema = new mongoose.Schema({

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

	story: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Story'
	},

	idea: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Idea'
	},

	comment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	},	

	reply: {
		type: String,
		required: [true, 'Comment cannot be blank.']
	}

}, { timestamps: true});


//Register Schemas 
//UserSchema
//Register the Schemas last


UserSchema.pre('save',function(callback){
	console.log('hashing user password...')
	this.hashPassword(this.password);
	callback();
});

UserSchema.pre('remove',function(callback){
	var self = this;
	Story.remove({user:self._id}, function(){
	}).then(function(){
		Idea.remove({user:self._id},callback);
	}).then(function(){
		Comment.remove({user:self._id},callback);
	}).then(function(){
		Reply.remove({user:self._id},callback);
	})
})

mongoose.model('User', UserSchema);

//StorySchema
mongoose.model('Story',StorySchema);

StorySchema.pre('remove',function(callback){
	var self=this;
	Idea.remove({story: this._id},function(){
	}).then(function(){
		Comment.remove({story: this._id},callback);
	}).then(function(){
		Reply.remove({story: this._id},callback);
	}).then(function(){
		User.update({ }, {$pull: {stories: this._id}},{multi: true});
	})
})

//IdeaSchema
mongoose.model('Idea',IdeaSchema);

IdeaSchema.pre('remove',function(callback){
	var self=this;
	Comment.remove({idea: self._id},function(){
	}).then(function(){
		Reply.remove({idea: self._id},callback);
	}).then(function(){
		Story.update({ }, {$pull: {ideas: self._id}},{multi: true});
	}).then(function(){
		User.update({ }, {$pull: {ideas: self._id}},{multi: true});
	})	
});

//CommentSchema
mongoose.model('Comment', CommentSchema);

CommentSchema.pre('remove',function(callback){
	var self=this;
	Reply.remove({comment: self._id},function(){
	}).then(function(){
		Idea.update({ }, {$pull: {comments: self._id}},{multi: true});
	}).then(function(){
		Story.update({ }, {$pull: {comments: self._id}},{multi: true});
	}).then(function(){
		User.update({ }, {$pull: {comments: self._id}},{multi: true});
	})	
})

//ReplySchema
mongoose.model('Reply', ReplySchema);

ReplySchema.pre('remove',function(callback){
	var self=this;
	Comment.update({ }, {$pull: {replies: this._id}},{multi: true},function(){
	}).then(function(){
		Idea.update({ }, {$pull: {replies: this._id}},{multi: true});
	}).then(function(){
		Story.update({ }, {$pull: {replies: this._id}},{multi: true});
	}).then(function(){
		User.update({ }, {$pull: {replies: this._id}},{multi: true});
	})	
})

