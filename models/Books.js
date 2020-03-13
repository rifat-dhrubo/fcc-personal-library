const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: 'Books must have a title which is 3 character or more',
		minlength: 3,
		trim: true,
	},
	comments: [String],
});

bookSchema.statics.getCommentCount = function() {
	return this.aggregate([{ $project: { title: 1, commentcount: { $size: '$comments' } } }]);
};

module.exports = mongoose.model('Book', bookSchema);
