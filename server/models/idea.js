var mongoose = require('mongoose');

var Comment = mongoose.model('Comment');
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

// register the Idea model
mongoose.model('Idea',IdeaSchema);