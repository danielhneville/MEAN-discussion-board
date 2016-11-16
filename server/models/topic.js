var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var commentSchema = new mongoose.Schema({
	_commenter: {
		type: String,
		ref: 'User'
	},
	comment: {
		type: String,
		required: [true, 'comment is required'],
		minlength: [5, 'comment must be at least 5 characters long'],
		trim: true
	}
}, {timestamps: true})

var postSchema = new mongoose.Schema({
	_poster: {
		type: String,
		ref: 'User'
	},
	post: {
		type: String,
		required: [true, 'post is required'],
		minlength: [5, 'post must be at least 5 characters long'],
		trim: true
	},
	upvotes: {
		type: Number,
		min: 0
	},
	downvotes: {
		type: Number,
		min: 0
	},
	comments: [commentSchema]
}, {timestamps: true})

var topicSchema = new mongoose.Schema({
	_creator: {
		type: String,
		ref: 'User',
		required: true
	},
	topic: {
		type: String,
		required: [true, 'Topic is required'],
		unique: true,
		uniqueCaseInsensitive: true
	},
	description: {
		type: String,
		required: [true, 'description is required']
	},
	category: {
		type: String,
		required: [true, 'category is required'],
		enum:['Hodor', 'Culture', 'Politics', 'Economy', 'Cats'],
	},
	posts: [postSchema]	
}, {timestamps: true})

topicSchema.plugin(uniqueValidator, {message: 'Someone has asked this exact question before!'});

mongoose.model('Topic', topicSchema);
