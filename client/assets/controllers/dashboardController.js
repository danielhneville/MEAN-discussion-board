app.controller('dashboardController', function($scope, $location, userFactory, topicFactory){

	var self = this;
	this.user = {};
	this.categories = [];
	this.search = '';
	this.form = {};
	this.topics = [];

	topicFactory.getTopics(function(result){
		if (result.data.errors){
			console.log(result.data.errors);
		} else {
			self.topics = result.data;
		}
	})

	userFactory.getUser(function(status){
		if(!status){
			$location.url('/')
		} else {
			self.user = status;
			self.form.id = status._id;
		}
	})

	topicFactory.getCats(function(result){
		for (var i = 0; i < result.length; i++){
			self.categories.push(result[i].category);
		}
	})

	this.create = function(){
		topicFactory.create(self.form)
			.then(function(){
				topicFactory.index()
				.then(function(result){
					self.topics = result.data;
				})
			})
	}
})
