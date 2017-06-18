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

	return factory;
});
