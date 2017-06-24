console.log('storiescontroller');
app.controller('StoriesController',function(UserFactory,StoryFactory,IdeaFactory,CommentFactory,ReplyFactory,$routeParams){
	console.log("initializing StoriesController...");

	var self = this;
	self.stories = [];
	self.new_story_errors = [];
	self.newStory = {};
	self.new_idea_errors=[];
	self.newIdea = {};
	self.new_comment_errors=[];
	self.newComment = {};
	self.new_reply_errors=[];
	self.newReply = {};

	self.index = function(){
		StoriesFactory.index(function(res){
			self.stories = res.data;
			console.log(self.stories);
		})
	}

	self.create=function(newStory){
		UserFactory.session(function(user){
			newStory.user=user._id;
			StoryFactory.create(newStory,function(res){
				if(res.data.errors){
					for(key in res.data.errors){
						var error = res.data.error[key];
						self.new_story_errors.push(error.message);
					}
				} else {
					self.index();
				}
			})
		})
	}

	self.destroy=function(story_id){
		console.log("destroy",story_id);
		StoryFactory.destroy(story_id,self.index);
	}

	self.update=function(story_id){
		console.log("update",story_id);
		StoryFactory.update(story_id,self.index);
	}	


})

