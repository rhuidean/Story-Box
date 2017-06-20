var mongoose = require("mongoose");

// import relevant models
var User = mongoose.model('User');
var Story = mongoose.model('Story');
var Idea = mongoose.model('Idea');

module.exports = {
	
	index: function(req,res){
		Story.find({}).populate({
			path: 'user',
			model: 'User'
		}).populate({
			path: 'ideas',
			model: 'Idea',
			options: {sort: {createdAt: 1}},
			populate: {
				path: 'user',
				model: 'User',
			}
		}).populate({
			path: 'ideas',
			model: 'Idea',
			options: {sort: {createdAt: 1}},
			populate: {
				path: 'comments',
				model: 'Comment',
				populate: {
					path: 'replies',
					model: 'Reply'
				}
			}
		}).sort('-createdAt').exec(function(err,stories){
			if(err){
				return res.json(err);
			}
			return res.json(stories);
		})
	},

	create: function(req,res){
		Story.create(req.body,function(err,story){
			if(err){
				return res.json(err);
			}
			User.findByIdAndUpdate(req.body.user, { $push: {stories: story._id}}, function(err,user){
					if(err){
						return res.json(err);
					}
					return res.json(story);
				}
			)
		})
	},

	destroy: function(req,res){
		// debugging
		console.log("delete route");
		Story.findById(req.params.id,function(err,story){
			if(err){
				return res.json(err);
			}
			console.log('story', story);
			story.remove(function(err,story){
				if(err){
					return res.json(err);
				}
				console.log('story after remove: ', story);
				return res.json(story);
			})
		})
	},

	update: function(req,res){
		Story.findByIdAndUpdate(req.params.id,{$set:{storykeywords: req.body.keywords}}, function(err,story){
			if(err){
				return res.json(err);
			}
			return res.json(story);
		})
	}







}