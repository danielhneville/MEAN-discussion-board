app.controller('topicController', function($scope, $location, $routeParams, topicFactory, userFactory){

	var self = this;
	this.topic = {};
	this.user = {};
	this.post = '';
	this.newComment = {};

	userFactory.getUser(function(status){
		if(!status){
			$location.url('/')
		} else {
			self.user = status;
		}
	})

	var getTopic = function(){
		topicFactory.getTopic($routeParams.id)
			.then(function(data){
				self.topic = data;
			})
	}
	getTopic();

	$scope.logout = function(){
		userFactory.logout();
		$location.url('/');
	}

	this.createPost = function(){
		topicFactory.createPost(self.topic._id, {_poster: self.user._id, post: self.post})
			.then(function(){
				getTopic();
				self.post = '';
			})
	}
	this.createComment = function(postID){
		topicFactory.createComment(self.topic._id, postID, {_commenter: self.user._id, comment: self.newComment[postID]})
			.then(function(){
				getTopic();
				self.newComment[postID] = '';
			})
	}
	this.vote = function(postID, vote){
		topicFactory.vote(self.topic._id, postID, {id: self.user._id, vote: vote})
			.then(function(){
				getTopic();
			})
	}

})
