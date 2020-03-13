const expect = require('chai').expect;
const express = require('express');
const router = express.Router();
const Book = require('../models/Books');
const { theSureThing } = require('../utils/handlers');

router
	.route('/')
	.get((req, res) => {
		//response will be array of book objects
		//json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
	})
	.post(async (req, res) => {
		const bookTitle = req.body.title;
		console.log({ title: bookTitle });
		[err, data] = await theSureThing(Book.create({ title: bookTitle }));
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
	.delete((req, res) => {
		//if successful response will be 'complete delete successful'
	});

router
	.route('/:id')
	.get((req, res) => {
		const bookid = req.params.id;
		//json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
	})
	.post((req, res) => {
		const bookid = req.params.id;
		const comment = req.body.comment;
		//json res format same as .get
	})
	.delete((req, res) => {
		const bookid = req.params.id;
		//if successful response will be 'delete successful'
	});

module.exports = router;
