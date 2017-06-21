var mongoose = require('mongoose');

//Schemas


//Register Schemas

var ReplySchema = require('./a_reply.js');

var User = mongoose.model('User');
var Idea = mongoose.model('Idea');
var Story = mongoose.model('Story');
var Comment = mongoose.model('Comment');
var Reply = mongoose.model('Reply');

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