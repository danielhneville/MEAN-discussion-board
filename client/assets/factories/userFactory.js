app.factory('userFactory', function($http){
	var user = null;

	function UserFactory(){};

	UserFactory.prototype.login = function(info, callback) {
		$http.post('/users', info)
			.then(function(result){
				if (!result.data.errors){
					user = result.data;
				}
				callback(result.data);
			})
	};
	
	UserFactory.prototype.getUser = function(callback) {
		callback(user);
	};

	UserFactory.prototype.getInfo = function(id, callback) {
		$http.get('/users/' + id)
			.then(function(result){
				callback(result.data);
			})	
	};
	UserFactory.prototype.logout = function() {
		user = null;
		return user;
	};

	return new UserFactory();
})
