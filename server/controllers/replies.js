var mongoose = require("mongoose");

// import relevant models
var User = mongoose.model('User');
var Story = mongoose.model('Story');
var Idea = mongoose.model('Idea');
var Comment = mongoose.model('Comment');
var Reply = mongoose.model('Reply');

module.exports = {
	
	index: function(req,res){
		Reply.find({}).populate({
			path: 'user',
			model: 'User'
		}).populate({
			path: 'story',
			model: 'Story'
		}).populate({
			path: 'idea',
			model: 'Idea'
		}).populate({
			path: 'comment',
			model: 'Comment'
		}).sort('-createdAt').exec(function(err,replies){
			if(err){
				return res.json(err);
			}
			return res.json(replies);
		})
	},

	create: function(res,req){
		Reply.create(req.body, function(err,reply){
			if(err){
				return res.json(err);
			}
			User.findByIdAndUpdate(req.body.user, { $push: {replies: reply._id}}, function(err,user){
				if(err){
					return res.json(err);
				}
				Story.findByIdAndUpdate(req.body.story,{ $push: {replies: reply._id}},function(err,story){
					if(err){
						return res.json(err);
					}
					Idea.findByIdAndUpdate(req.body.idea, { $push: {replies: reply._id}},function(err,idea){
						if(err){
							return res.json(err);
						}
						Comment.findByIdAndUpdate(req.body.comment, { $push: {replies: reply._id}},function(err,comment){
							if(err){
								return res.json(err);
							}
							return res.json(comment);
						})
					})
				})
				
			})
		})
	},

	destroy: function(req,res){
		// debugging
		console.log("delete route");
		Reply.findById(req.params.id,function(err,reply){
			if(err){
				return res.json(err);
			}
			console.log('reply before removal', reply);
			reply.remove(function(err,reply){
				if(err){
					return res.json(err);
				}
				console.log('reply after removal: ', reply);
				return res.json(reply);
				// should return 
			})
		})
	},

	update: function(req,res){
		Reply.findByIdAndUpdate(req.params.id,{$set:{reply: req.body.reply}}, function(err,reply){
			if(err){
				return res.json(err);
			}
			return res.json(reply);
		})
	},

}