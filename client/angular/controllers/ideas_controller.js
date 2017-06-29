console.log('ideascontroller');
app.controller('RepliesController',function(){
	console.log("initializing RepliesController...");

	var self = this;
	
	self.index = function(){
		StoriesFactory.index(function(res){
			self.stories = res.data;
			console.log(self.stories);
		})
	}

	self.destroy=function(story_id){
		console.log("destroy",story_id);
		StoryFactory.destroy(story_id,self.index);
	}

	self.destroyIdea=function(idea_id){

	}


})