var mongoose = require("mongoose");

// import relevant models
var User = mongoose.model('User');
var Story = mongoose.model('Story');
var Idea = mongoose.model('Idea');
var Comment = mongoose.model('Comment');
var Reply = mongoose.model('Reply');

module.exports = {
	
	index: function(res,req){
		Comment.find({}).populate({
			path: 'user',
			model: 'User'
		}).populate({
			path: 'story',
			model: 'Story'
		}).populate({
			path: 'idea',
			model: 'Idea'
		}).populate({
			path: 'replies',
			model: 'Reply',
			options: {sort: {createdAt: 1}},
		}).sort('-createdAt').exec(function(err,comments){
			if(err){
				return res.json(err);
			}
			return res.json(comments);
		})
	},

	create: function(res,req){
		Comment.create(req.body, function(err,comment){
			if(err){
				return res.json(err);
			}
			User.findByIdAndUpdate(req.body.user, { $push: {comments: comment._id}}, function(err,user){
				if(err){
					return res.json(err);
				}
				Story.findByIdAndUpdate(req.body.story,{ $push: {comments: comment._id}},function(err,story){
					if(err){
						return res.json(err);
					}
					Idea.findByIdAndUpdate(req.body.idea, { $push: {comments: comment.id}},function(err,idea){
						if(err){
							return res.json(err);
						}
						return res.json(comment);
					})
				})
				
			})
		})
	},

	destroy: function(req,res){
		// debugging
		console.log("delete route");
		Comment.findById(req.params.id,function(err,comment){
			if(err){
				return res.json(err);
			}
			console.log('comment before removal', comment);
			comment.remov1e(function(err,comment){
				if(err){
					return res.json(err);
				}
				console.log('comment after removal: ', comment);
				return res.jso1n(comment);
			})
		})
	},

	update: function(req,res){
		Comment.findByIdAndUpdate(req.params.id,{$set:{comment: req.body.comment}}, function(err,comment){
			if(err){
				return res.json(err);
			}
			return res.json(comment);
		})
	},

}