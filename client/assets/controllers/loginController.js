app.controller('loginController', function($scope, $location, userFactory){

	var self = this;
	this.form = {};
	this.errors = [];

	this.login = function(){
		this.errors = [];
		userFactory.login(self.form, function(result){
			if (result.errors){
				for (key in result.errors){
					self.errors.push(result.errors[key].message);
				}
			} else {
				$location.url('/dashboard');
			}
		})
	}

})
