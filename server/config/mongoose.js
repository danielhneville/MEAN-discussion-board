var mongoose = require('mongoose'),
	fs = require('fs'),
	path = require('path');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/discussion_board');

var models_path = path.join(__dirname, './../models');

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') > 0){
		require(models_path + '/' + file);
	}
})
