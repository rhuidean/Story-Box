console.log("CommentFactory");

Reply.factory('CommentFactory',function($http){
	var factory = {};

	factory.create = function(newComment,callback){
		$http.post('/comments',newComment).then(callback);
	}

	factory.index = function(callback){
		$http.get('/comments').then(callback);
	}

	factory.destroy=function(id,callback){
		$http.delete('/comments/:id').then(callback);
	}

	factory.update=function(id,callback){
		$http.put('/comments/:id').then(callback);
	}

})

