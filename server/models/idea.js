var mongoose = require('mongoose');

// var User = mongoose.model('User');
// var Comment = mongoose.model('Comment');
// var Idea = mongoose.model('Idea');
// var Reply = mongoose.model('Reply');


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
})

// register the Idea model
mongoose.model('Idea',IdeaSchema);