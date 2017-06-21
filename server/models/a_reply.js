var mongoose = require("mongoose");

// var User = mongoose.model('User');
// var Idea = mongoose.model('Idea');
// var Story = mongoose.model('Story');
// var Comment = mongoose.model('Comment');

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

// ReplySchema.pre('remove',function(callback){
// 	var self=this;
// 	Comment.update({ }, {$pull: {replies: this._id}},{multi: true},function(){
// 	}).then(function(){
// 		Idea.update({ }, {$pull: {replies: this._id}},{multi: true});
// 	}).then(function(){
// 		Story.update({ }, {$pull: {replies: this._id}},{multi: true});
// 	}).then(function(){
// 		User.update({ }, {$pull: {replies: this._id}},{multi: true});
// 	})	
// })

mongoose.model('Reply', ReplySchema);

module.exports = ReplySchema;