const expect = require('chai').expect;
const express = require('express');
const router = express.Router();

router
	.route('/')
	.get((req, res) => {
		//response will be array of book objects
		//json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
	})
	.post((req, res) => {
		const title = req.body.title;
		//response will contain new book object including atleast _id and title
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
