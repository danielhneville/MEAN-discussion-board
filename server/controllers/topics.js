var mongoose = require('mongoose'),
	Topic = mongoose.model('Topic'),
	Category = mongoose.model('Category');

function TopicController(){};

TopicController.prototype.index = function(req, res) {
	Topic.find({}).populate('_creator').exec(function(err, data){
		if(err){
			res.json(err);
		} else {
			res.json(data);
		}
	})
};

TopicController.prototype.create = function(req, res) {
	var newTopic = new Topic({
		_creator: req.body.id,
		topic: req.body.topic,
		description: req.body.description,
		category: req.body.category
	});
	newTopic.save(function(err, result){
		if(err){
			res.json(err);
		} else {
			res.json(result);
		}
	})
};

TopicController.prototype.getOne = function(req, res) {
	Topic.findOne({_id: req.params.id}).populate('_creator posts._poster posts.comments._commenter').exec(function(err, data){
		if(err){
			res.json(err);
		} else {
			res.json(data);
		}
	})
};

TopicController.prototype.createPost = function(req, res) {
	var newPost = {
		_poster: req.body._poster,
		post: req.body.post,
		upvotes: 0,
		downvotes: 0	
	};
	Topic.findOne({_id: req.params.id}, function(err, result){
		if(err){
			res.json(err);
		} else {
			return result;		
		}
	}).then(function(result){
		result.posts.push(newPost);
		result.save(function(err){
			if(err){
				console.log(err);
				res.json(err);
			} else {
				res.json({success: true});
			}
		})
	})
};

TopicController.prototype.createComment = function(req, res) {
	Topic.findOne({_id: req.params.id}, function(err, result){
		if(err){
			res.json(err);
		} else {
			return result;
		}
	}).then(function(result){
		var post = result.posts.id(req.params.postID);
		post.comments.push({_commenter: req.body._commenter, comment: req.body.comment})
		result.save(function(err){
			if(err){
				console.log(err);
				res.json(err);
			} else {
				res.json({success: true});
			}
		})
	})
};

TopicController.prototype.update = function(req, res) {
	Topic.findOne({_id: req.params.id}, function(err, result){
		if(err){
			res.json(err);
			return null;
		} else {
			return result;
		}
	}).then(function(result){
		if (result){
			var post = result.posts.id(req.params.postID);
			if (post._poster == req.body.id){
				return null;
			} else {
				post[req.body.vote]++;	
			}
			result.save(function(err){
				if (err){
					console.log(err);
					res.json(err);
				} else {
					res.json({success: true});
				}
			})
		} else {
			res.json({success: false, reason: 'Cannot vote on your own answer!'});
		}
	})
};

TopicController.prototype.getCats = function(req, res) {
	Category.find({}, function(err, data){
		if(err){
			res.json(err);
		} else {
			res.json(data);
		}
	})
};

module.exports = new TopicController();
