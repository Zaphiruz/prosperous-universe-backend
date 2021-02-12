const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
	id: String,
	name: String,
	materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }]
})

module.exports = mongoose.model('Materials', CategorySchema);