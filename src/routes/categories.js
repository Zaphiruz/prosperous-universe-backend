const express = require('express');
const router = express.Router();

const Category = require('../models/Category.js');

// read
router.get('/', async (req, res) => {
	try {
		const categories = await Category.find();
		res.json(categories);
	} catch (error) {
		console.error('Error getting categories', error);
		res.status(500).send(error);
	}
});
router.get('/:id', async (req, res) => {
	try {
		const categories = await Category.findOne({ id: req.params.id });
		res.json(categories);
	} catch (error) {
		console.error('Error getting categories', error);
		res.status(500).send(error);
	}
});

// create
router.post('/', async (req, res) => {
	try {
		let category = new Category(req.body);
		let data = await category.save();
		res.json(data);
	} catch (error) {
		console.error('Error saving category', error);
		res.status(500).send(error);
	}
});

// update
router.put('/:id', async (req, res) => {
	try {
		let data = await Category
			.findOneAndUpdate({ id: req.params.id }, req.body, {
				returnOriginal: false,
				omitUndefined: true
			})
			.exec();
		
		res.json(data);
	} catch (error) {
		console.error('Error updating category', error);
		res.status(500).send(error);
	}
});

// delete
router.delete('/:id', async (req, res) => {
	try{
		let data = await Category
			.findOneAndDelete({ id: req.params.id })
			.exec();
		
		res.json(data);
	} catch (error) {
		console.error('Error deleting category', error);
		res.status(500).send(error);
	}
});

module.exports = router;