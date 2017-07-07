console.log("IdeaFactory");

app.factory('IdeaFactory',function($http){
	var factory = {};

	factory.create = function(newIdea,callback){
		console.log('new idea at factory: ', newIdea);
		$http.post('/ideas',newIdea).then(callback);
	}

	factory.index = function(callback){
		$http.get('/ideas').then(callback);
	}

	factory.destroy=function(id,callback){
		$http.delete('/ideas/'+id).then(callback);
	}

	factory.update=function(id,callback){
		$http.put('/ideas/:id').then(callback);
	}

	return factory;

})

