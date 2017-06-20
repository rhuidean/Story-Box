var mongoose = require("mongoose");

// import relevant models
var User = mongoose.model('User');
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
				})
			})
		})
	},







}