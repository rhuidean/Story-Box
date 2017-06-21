var mongoose = require("mongoose");

// var User = mongoose.model('User');
// var Idea = mongoose.model('Idea');
// var Story = mongoose.model('Story');
// var Reply = mongoose.model('Reply');

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

// CommentSchema.pre('remove',function(callback){
// 	var self=this;
// 	Reply.remove({comment: self._id},function(){
// 	}).then(function(){
// 		Idea.update({ }, {$pull: {comments: self._id}},{multi: true});
// 	}).then(function(){
// 		Story.update({ }, {$pull: {comments: self._id}},{multi: true});
// 	}).then(function(){
// 		User.update({ }, {$pull: {comments: self._id}},{multi: true});
// 	})	
// })

mongoose.model('Comment', CommentSchema);