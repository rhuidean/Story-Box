var mongoose = require("mongoose");

var Reply = mongoose.model('Reply');
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

mongoose.model('Comment', CommentSchema);