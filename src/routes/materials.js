const { json } = require('body-parser');
const express = require('express');
const router = express.Router();

const Material = require('../models/Material.js');

// read
router.get('/', async (req, res) => {
	try {
		const materials = await Material.find();
		res.json(materials);
	} catch (error) {
		console.error('Error getting materials', error)
		res.status(500).send(error);
	}
});
router.get('/:id', async (req, res) => {
	try {
		const materials = await Material.findOne({ id: req.params.id });
		res.json(materials);
	} catch (error) {
		console.error('Error getting materials', error)
		res.status(500).send(error);
	}
});

// create
router.post('/', async (req, res) => {
	try {
		let material = new Material(req.body);
		let data = await material.save()
		res.json(data)
	} catch (error) {
		console.error('Error saving material', error)
		res.status(500).send(error);
	}
})

// update
router.put('/:id', async (req, res) => {
	try {
		let data = await Material
			.findOneAndUpdate({ id: req.params.id }, req.body, {
				returnOriginal: false,
				omitUndefined: true
			})
			.exec()
		
		res.json(data)
	} catch (error) {
		console.error('Error updating material', error)
		res.status(500).send(error);
	}
})

module.exports = router;