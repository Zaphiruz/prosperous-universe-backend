import express from 'express';
const router = express.Router();
import { StorageModel, normalizeStorage } from '../models/storage';

router.post('/', async (req, res) => {
	try {
		console.log(req.body)
		let storage = await saveStorage(req.body);
		return res.send(storage);
	} catch(e) {
		console.error(e);
		return res.status(400).send(e);
	}
})

async function saveStorage(data) {
	let normalizedData = normalizeStorage(data);
	console.log(normalizedData)
	let model = new StorageModel(normalizedData);
	return await model.save();
}

export default router;