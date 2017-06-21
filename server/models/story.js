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

StorySchema.pre('remove',function(callback){
	var self=this;
	Idea.remove({story: this._id},callback).then(function(){
		Comment.remove({story: this._id},callback).then(function(){
			Reply.remove({story: this._id},callback);
		})
	}),

	
})

mongoose.model('Story',StorySchema);