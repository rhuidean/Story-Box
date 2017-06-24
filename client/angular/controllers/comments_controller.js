console.log('commentscontroller');
app.controller('CommentsController',function(){
	console.log("initializing CommentsController...");

	var self = this;
	
	self.index = function(){
		CommentsFactory.index(function(res){
			self.comments = res.data;
			console.log(self.comments);
		})
	}

	self.destroy=function(story_id){
		console.log("destroy",story_id);
		CommentsFactory.destroy(story_id,self.index);
	}

	self.update=function(story_id){

	}


})