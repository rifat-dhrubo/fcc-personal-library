const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: 'Books must have a title which is 3 character or more',
		minlength: 3,
	},
	comments: [String],
});

module.exports = mongoose.model('Book', bookSchema);
