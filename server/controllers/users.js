var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {

	index: function(req,res){
		console.log("cookies",req.cookies);
		console.log("===============");
		console.log("session",req.session);
		User.find({}, function(err,users){
			if(err){
				return res.json(err);
			}
			return res.json(users);
		})
	},

	create: function(req,res) {
		console.log(req.body)
		User.create(req.body, function(err,user){
			if(err){
				return res.json(err);
			}
			if(req.session.user){
				req.session.destroy();
			}
			else{
				req.session.user=user;
			}
			return res.json(user);
		})
	},

	login: function(req,res){
		// look up the email and return an object
		User.findOne({email: req.body.email}, function(err,user){
			if(err){
				return res.json(err);
			}

			// check for null, and authenticate the password
			if(user && user.authenticate(req.body.password)){
				if(!req.session.user){
					req.session.user = user;
					console.log(req.session.user);
				}
				return res.json(user)
			}

			// bad credentials
			return res.json({
				"errors": {
					"password": {
						"message" : "Invalid credentials."
					}
				}
			})
		})
	},

	addFriend: function(req,res){
		// console(req.body);
		User.findByIdAndUpdate(req.session.user._id,{$push:{"friends":req.params.id}},{new:true},function(err,user){
			if(err){
				return res.json(err);
			}
			return res.json(user);
		})
		// return res.json(user);
	},

	deleteFriend: function(req,res){
		// console(req.body);
		User.findByIdAndUpdate(req.session.user._id,{$pull:{"friends":req.params.id}},{new:true},function(err,user){
			if(err){
				return res.json(err);
			}
			return res.json(user);
		})
		// return res.json(user);
	},


	// show: function(req,res){
	// 	User.findById(req.params.id).exec(function(err,user){
	// 		if(err){
	// 			return res.json(err);
	// 		}
	// 		if(!user){
	// 			return res.json({
	// 				"errors": "404 - User not found!"
	// 			})
	// 		}
	// 		return res.json(user);
	// 	})
	// },
};