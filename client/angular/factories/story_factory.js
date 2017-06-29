console.log("StoryFactory");

app.factory('StoryFactory',function($http){
	var factory = {};

	factory.create = function(newStory,callback){
		$http.post('/stories',newStory).then(callback);
	}

	factory.index = function(callback){
		$http.get('/stories').then(callback);
	}

	factory.destroy=function(id,callback){
		$http.delete('/stories/' + id).then(callback);
	}

	// routes +
	factory.update=function(id,callback){
		$http.put('/stories/'+id).then(callback);
	}

	return factory;

})



//angular.js:14525 Error: [$injector:undef] Provider 'IdeaFactory' must return a value from $get factory method.
