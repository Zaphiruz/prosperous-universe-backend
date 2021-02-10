const mongoose = require('mongoose');

const MaterialSchema = mongoose.Schema({
	category: String,
	id: String,
	name: String,
	ticker: String,
	volume: Number,
	weight: Number
})

module.exports = mongoose.model('Materials', MaterialSchema);