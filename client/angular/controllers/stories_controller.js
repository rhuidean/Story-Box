console.log('StoriesController');
// factory return
// controller not loading syntax
app.controller('StoriesController',function(UserFactory,StoryFactory,IdeaFactory,CommentFactory,ReplyFactory,$routeParams, $sce){
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


	// self.index proper display should refresh
	self.index = function(){
		StoryFactory.index(function(res){
			self.stories = res.data;
			console.log('here: ', self.stories);
		})
	}

	self.create=function(newStory){
		console.log("Submit form",newStory)
		var array_storykeywords =[];
		var string_storykeywords=newStory.storykeywords;
		console.log(string_storykeywords);
		if (RegExp(/[# ,]/).test(string_storykeywords)==false) {
			newStory.storykeywords=array_storykeywords.push(string_storykeywords);
		} else {
			console.log(string_storykeywords)
			console.log('type: ', typeof(string_storykeywords))
			array_storykeywords=string_storykeywords.split(/(?=[# ,])/);
			for (var i=0;i<array_storykeywords.length;i++){
				array_storykeywords[i]=array_storykeywords[i].replace(/[#, ]?/g,'');
			}
			newStory.storykeywords=array_storykeywords;
			console.log(newStory.storykeywords);
		}
		console.log(newStory.storykeywords[0])
		UserFactory.session(function(user){			
			console.log("StoryUser",user);
			newStory.user=user._id;
			console.log('newStory:', newStory)
			StoryFactory.create(newStory,function(res){
				console.log(newStory.user)
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

	// story._id not possible
	self.createIdea=function(newIdea,index_story,story_id){
		console.log("Controller Idea",newIdea,index_story,story_id)
		if(!newIdea[index_story]){
			newIdea[index_story]={};
		}
		// newIdea {
		// 	'0': {},
		// 	'1': {'name': 'Cody'},

		// }
		// newIdea{
		// 	'name': 'Cody'
		// }
		newIdea=newIdea[index_story];
		
		newIdea.story=story_id;
		UserFactory.session(function(user){			
			console.log("IdeaUser",user);
			newIdea.user=user._id;
			console.log('newIdea:', newIdea);
			IdeaFactory.create(newIdea,function(res){
				console.log(newIdea.user)
				console.log("Created newIdea",newIdea)
				if(res.data.errors){
					for(key in res.data.errors){
						var error = res.data.error[key];
						self.new_story_errors.push(error.message);
					}
				} else {
					console.log(res)
					self.index();
				}
			})
		})
	}

	self.destroyIdea=function(idea_id){
		console.log("destroy",idea_id);
		IdeaFactory.destroy(idea_id,self.index);
	}

	// cross domain issues
	self.trustSrc = function(src) {
		src = src.replace("watch?v=", "embed/");
	    return $sce.trustAsResourceUrl(src);
  	}

})

