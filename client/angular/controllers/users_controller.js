app.controller('UsersController',function(UserFactory,$location,$routeParams){
	console.log('initializing UsersController...');
	
	var self = this;
	self.registration_errors = [];
	self.login_errors = [];

	self.session = function(){
		UserFactory.session(function(res){
			console.log('session: ', res)
			if(!res.data.error){
				self.current_user = res.data;
				console.log('self CU: ', self.current_user)
			} else {
				self.current_user = {};
				$location.url('/');
			}
		});
	}

	self.login = function(loginUser){
		UserFactory.login(loginUser,function(res){
			console.log('login: ', res)
			if(res.data.errors){
				for (key in res.data.errors){
					var error = res.data.errors[key];
					self.login_errors.push(error.message);
				}
			} else {
				$location.url('/dashboard');
			}
		})
	}

	self.logout = function(){
		UserFactory.logout(function(res){
			$location.url('/');
		})
	}

	self.create = function(newUser){
		console.log('newUser',newUser);
		UserFactory.create(newUser,function(res){
			if(res.data.errors){
				for(key in res.data.errors){
					var error = res.data.errors[key];
					self.registration_errors.push(error.message);
				}
			} else {
				console.log("redirect");
				$location.url('/dashboard');
			}
			console.log(res);
		})
	}
})