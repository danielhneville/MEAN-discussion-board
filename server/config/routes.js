var mongoose = require('mongoose');

var topics = require('./../controllers/topics.js');
var users = require('./../controllers/users.js');

module.exports = function(app){
	app.post('/users', users.login);
	app.get('/users/:id', users.getInfo);
	app.get('/topics', topics.index);
	app.post('/topics', topics.create);
	app.get('/topics/categories', topics.getCats);
	app.get('/topics/:id', topics.getOne);
	app.post('/topics/:id', topics.createPost);
	app.post('/topics/:id/:postID', topics.createComment);
	app.put('/topics/:id/:postID', topics.update);
}
