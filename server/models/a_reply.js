var mongoose = require("mongoose");


//
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

mongoose.model('Reply', ReplySchema);