app.controller('UsersController',function(UserFactory,$location){
	console.log('initializing UsersController...');
	
	var self = this;
	self.registration_errors = [];
	self.login_errors = [];

	self.session = function(){
		console.log('sessions function');
		UserFactory.session(function(res){
			if(user){
				self.current_user = user;
			} else {
				$location.url('/');
			}
		});
	}

	self.login = function(loginUser){
		UserFactory.login(loginUser,function(res){
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

	self.create = function(){
		
	}

})