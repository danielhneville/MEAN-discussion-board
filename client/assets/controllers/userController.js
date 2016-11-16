app.controller('userController', function($scope, $location, $routeParams, userFactory){

	var self = this;
	this.user = {};
	this.errors = [];

	userFactory.getUser(function(status){
		if(!status){
			$location.url('/')
		}
	})

	userFactory.getUser(function(status){
		if(!status){
			$location.url('/')
		} else {
			userFactory.getInfo($routeParams.id, function(result){
				self.user = result;
			})	
		}
	});

})
