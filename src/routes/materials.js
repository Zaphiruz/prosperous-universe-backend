const { json } = require('body-parser');
const express = require('express');
const router = express.Router();

const Material = require('../models/Material.js');

router.get('/', async (req, res) => {
	try {
		const materials = await Material.find();
		res.json(materials);
	} catch (error) {
		console.error('Error getting materials', error)
		res.json({ error: error.message })
	}
});
router.get('/:id', async (req, res) => {
	try {
		const materials = await Material.find({ id: req.params.id });
		res.json(materials);
	} catch (error) {
		console.error('Error getting materials', error)
		res.json({ error: error.message })
	}
});

router.post('/', async (req, res) => {
	let material = new Material(req.body);

	try {
		let data = await material.save()
		res.json(data)
	} catch (error) {
		console.error('Error saving material', error)
		res.json({ error: error.message })
	}
})

module.exports = router;