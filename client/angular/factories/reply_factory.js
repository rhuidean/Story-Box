console.log("ReplyFactory");

app.factory('ReplyFactory',function($http){
	var factory = {};

	factory.create = function(newReply,callback){
		$http.post('/replies',newReply).then(callback);
	}

	factory.index = function(callback){
		$http.get('/replies').then(callback);
	}

	factory.destroy=function(id,callback){
		$http.delete('/replies/:id').then(callback);
	}

	factory.update=function(id,callback){
		$http.put('/replies/:id').then(callback);
	}

	return factory;
})

