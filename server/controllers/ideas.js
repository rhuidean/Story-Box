var mongoose = require("mongoose");

// import relevant models
var User = mongoose.model('User');
var Story = mongoose.model('Story');
var Idea = mongoose.model('Idea');
var Comment = mongoose.model('Comment');
var Reply = mongoose.model('Reply');

module.exports = {

	index: function(res,req){
		Idea.find({}).populate({
			path:'user',
			model:'User'
		}).populate({
			path:'story',
			model:'Story'
		}).populate({
			path:'comments',
			model:'Comment',
			populate: {
				path: 'replies',
				model: 'Reply'
			}
		}).sort('-createdAt').exec(function(err,ideas){
			if(err){
				return res.json(err);
			}
			console.log(ideas);
			return res.json(ideas);
		})
	},

	create: function(res,req){
		Idea.create(req.body, function(err,idea){
			if(err){
				return res.json(err);
			}
			User.findByIdAndUpdate(req.body.user, { $push: {ideas: idea._id}}, function(err,user){
				if(err){
					return res.json(err);
				}
				Story.findByIdAndUpdate(req.body,story,{ $push: {ideas: idea._id}},function(err,story){
					if(err){
						return res.json(err);
					}
					return res.json(idea);
				})
			})
		})
	},

	destroy: function(res,req){
		Idea.findById(req.params.id, function(err,idea){
			if(err){
				return res.json(err);
			}
			// Difference between Idea vs idea
			idea.remove(function(err,idea){
				if(err){
					return res.json(err);
				}
				return res.json(idea);
			})
		})
	},

	update: function(res,req){
		Idea.findByIdAndUpdate(req.params.id,{$set:{idea: req.body.idea}}, function(err,idea){
			if(err){
				return res.json(err);
			}
			return res.json(idea);
		})
	},
}