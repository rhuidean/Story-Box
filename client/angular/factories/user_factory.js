console.log('UserFactory');

app.factory('UserFactory',function($http){
	var factory = {};

	// send req & rec res to and from the server
	factory.create = function(newUser,callback){
		$http.post('/users',newUser).then(callback)
	}


	// post object and receive data in json format
	factory.login = function(loginUser,callback){
		$http.post('/sessions', loginUser).then(callback);
	}

	// get response req.session.user
	factory.session = function(callback){
		console.log('factory seesion')
		$http.get('/sessions').then(function(res){
			if(!res.data.error){
				callback(res.data);
			} else {
				callback(false);
			}
		});
		// if(!res.data.error){ callback(res.data) }
		// else{ callback(false) }
	}

	// get response req.session.user empty
	factory.logout=function(callback){
		$http.delete('/sessions').then(callback);
	}

	return factory;
});
