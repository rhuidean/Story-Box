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

	// req.body undefined -> console.log before and after 
	// req and res switch
	create: function(req,res){
		console.log('req.body: ', req.body)
		var scrape = require('html-metadata');
 		var url = req.body.url;
 		scrape(url, function(error, metadata){
	    	req.body.title=metadata["openGraph"].title;
	    	req.body.description=metadata["openGraph"].description;
	    	req.body.image=metadata["openGraph"].image.url;
	    	req.body.source=metadata["openGraph"].site_name;
	    	console.log('inside: ', req.body)
    	
		}).then(function(){
			Idea.create(req.body, function(err,idea){
				if(err){
					return res.json(err);
				}
				User.findByIdAndUpdate(req.body.user, { $push: {ideas: idea._id}}, function(err,user){
					if(err){
						return res.json(err);
					}
					Story.findByIdAndUpdate(req.body.story,{ $push: {ideas: idea._id}},function(err,story){
						if(err){
							return res.json(err);
						}
						console.log("revised ideas",idea)
						return res.json(idea);
					})
				})
			})
		});

		// Promise and callback debugging
		// console.log('***************************************promise works')
		console.log('outside: ', req.body);
		
	},

	// req & res order matters
	// restart the server
	destroy: function(req,res){
		console.log("destroy idea")
		Idea.findById(req.params.id, function(err,idea){
			if(err){
				return res.json(err);
			}
			// Difference between Idea vs idea
			console.log('story before removal: ', idea);
			idea.remove(function(err,idea){
				if(err){
					return res.json(err);
				}
				console.log('story after removal: ', idea);
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