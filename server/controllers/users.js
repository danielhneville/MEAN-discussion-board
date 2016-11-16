var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Topic = mongoose.model('Topic');

function UserController(){};

UserController.prototype.login = function(req, res) {
	User.findOne({name: req.body.name}, function(err, result){
		if (err) {
			console.log(err);
			res.json(err);
		} else if (!result) {
			var newUser = new User({ name: req.body.name });
			newUser.save(function(err, result){
				if (err){
					console.log(err);
					res.json(err);
				} else {
					res.json(result);
				}
			})
		} else {
			res.json(result);
		}
	})
};

UserController.prototype.getInfo = function(req, res) {
	var userinfo = {};
	User.findOne({_id: req.params.id}, function(err, data){
		if(err){
			res.json(err);
		} else {
			userinfo._id = data._id;
			userinfo.name = data.name;
			userinfo.updatedAt = data.updatedAt;
			userinfo.createdAt = data.createdAt;
			userinfo.counts = {};
		}
	}).then(function(){
		Topic.count({_creator: req.params.id}, function(err, data){
			if(err){
				res.json(err);
			} else {
				userinfo.counts.topics = data;
			}
		}).then(function(){
			Topic.count({'posts._poster': req.params.id}, function(err, data){
				if(err){
					res.json(err);
				} else {
					userinfo.counts.posts = data;
				}
			}).then(function(){
				Topic.count({'posts.comments._commenter': req.params.id}, function(err, data){
					if(err){
						res.json(err);
					} else {
						userinfo.counts.comments = data;
					}
				}).then(function(){
					res.json(userinfo);
				})
			})
		})
	})
}

module.exports = new UserController();
