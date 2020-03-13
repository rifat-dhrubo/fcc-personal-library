const expect = require('chai').expect;
const express = require('express');
const router = express.Router();
const Book = require('../models/Books');
const { theSureThing } = require('../utils/handlers');

router
	.route('/')
	.get(async (req, res) => {
		[err, data] = await theSureThing(Book.getCommentCount());
		res.json(data);
	})
	.post(async (req, res) => {
		const bookTitle = req.body.title;
		console.log({ title: bookTitle });
		const [err, data] = await theSureThing(Book.create({ title: bookTitle }));
		if (err) {
			console.err(`can not save the book with title ${bookTitle}, Error ${err}`);
			return;
		}
		const { _id: unique_id, title } = data;

		res.json({
			unique_id,
			title,
		});
	})
	.delete(async (req, res) => {
		//if successful response will be 'complete delete successful'
		const [err, data] = await theSureThing(Book.deleteMany().exec());

		// in case of errors
		if (err) res.json(err);

		if (data.ok === 1) {
			res.send('complete delete successful');
		}
	});

router
	.route('/:id')
	.get(async (req, res) => {
		const bookId = req.params.id;
		const [err, data] = await theSureThing(Book.findOne({ _id: bookId }).exec());

		// in case of errors
		if (err) res.json(err);

		// if none exists with that id and no error occurs
		if (data === null && err === null) {
			res.send('no book exists');
		}

		const { _id, title, comments } = data;
		res.json({ _id, title, comments });
	})
	.post(async (req, res) => {
		const bookId = req.params.id;
		const comment = req.body.comment;

		const [err, data] = await theSureThing(
			Book.findOneAndUpdate(
				{ _id: bookId },
				{ $addToSet: { comments: [comment] } },
				{ new: true }
			).exec()
		);

		// in case of errors
		if (err) res.json(err);

		// if none exists with that id and no error occurs
		if (data === null && err === null) {
			res.send('no book exists');
		}

		const { _id, title, comments } = data;
		res.json({ _id, title, comments });
	})
	.delete(async (req, res) => {
		const bookId = req.params.id;
		const [err, data] = await theSureThing(Book.findOneAndDelete({ _id: bookId }).exec());
		// in case of errors
		if (err) res.json(err);

		// if none exists with that id and no error occurs
		if (data === null && err === null) {
			res.send('no book exists');
		}

		if (data) {
			res.send('delete successful');
		}
	});

module.exports = router;
