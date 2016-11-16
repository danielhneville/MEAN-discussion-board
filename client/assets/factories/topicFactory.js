app.factory('topicFactory', function($http){
	var topics = [];
	var categories = [];

	function TopicFactory(){
	};

	TopicFactory.prototype.index = function() {
		return $http.get('/topics')
			.then(function(result){
				if (result.data.errors){
					return result;
				} else {
					topics = result.data;
					return result;
				}
			})
	};
	TopicFactory.prototype.getTopics = function(callback) {
		if (!topics.length){
			$http.get('/topics').then(function(result){
				topics = result.data;
				callback(result);
			});
		} else {
			callback({data: topics});
		}
	};
	TopicFactory.prototype.getCats = function(callback) {
		if (categories.length){
			callback(categories);
		} else {
			$http.get('/topics/categories')
				.then(function(result){
					if (result.data.errors){
						console.log(result.data.errors);
					} else {
						categories = result.data;
						callback(result.data);
					}
				})
		}
	};
	TopicFactory.prototype.create = function(info) {
		return $http.post('/topics', info)
			.then(function(result){
				if (result.data.errors){
					return result.data;
				} else {
					return result.data;
				}
			})
	};
	TopicFactory.prototype.getTopic = function(id) {
		return $http.get('/topics/' + id).then(function(result){
				if (result.data.errors){
					return result.data;
				} else {
					return result.data;
				}
			})
	};
	TopicFactory.prototype.createPost = function(topicID, newPost) {
		return $http.post('/topics/' + topicID, newPost)
			.then(function(result){
				return result.data;
			})
	};
	TopicFactory.prototype.createComment = function(topicID, postID, newComment) {
		return $http.post('/topics/' + topicID + '/' + postID, newComment)
			.then(function(result){
				return result.data;
			})
	};
	TopicFactory.prototype.vote = function(topicID, postID, info) {
		return $http.put('/topics/' + topicID + '/' + postID, info)
			.then(function(result){
				return result.data;
			})
	};

	return new TopicFactory();
})
