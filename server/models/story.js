var mongoose = require('mongoose');

// var User = mongoose.model('User');
// var Idea = mongoose.model('Idea');
// var Comment = mongoose.model('Comment');
// var Reply = mongoose.model('User');

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

// StorySchema.pre('remove',function(callback){
// 	var self=this;
// 	Idea.remove({story: this._id},function(){
// 	}).then(function(){
// 		Comment.remove({story: this._id},callback);
// 	}).then(function(){
// 		Reply.remove({story: this._id},callback);
// 	}).then(function(){
// 		User.update({ }, {$pull: {stories: this._id}},{multi: true});
// 	})
// })

mongoose.model('Story',StorySchema);



// https://docs.mongodb.com/manual/reference/method/db.collection.update/