var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
	category: String
})

mongoose.model('Category', categorySchema, 'category');
