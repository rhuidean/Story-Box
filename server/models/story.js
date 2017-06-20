var mongoose = require('mongoose');

var Idea = mongoose.model('Idea');
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


}, {timestamp: true})

mongoose.model('Story',StorySchema);