import express from 'express';
const router = express.Router();
import { StorageModel, normalizeStorage } from '../models/storage';

router.post('/', async (req, res) => {
	console.log("Recieved storages request")
	try {
		// Check if dictionary
		let input = []
		if (req.body.constructor == Object) {
			for (var key in req.body) {
				req.body[key]._id = req.body[key].id;
				input.push(req.body[key]);
			}
		} else {
			input.push(req.body);
		}
		saveStorage(input);
		return res.send(input);
	} catch(e) {
		console.error(e);
		return res.status(400).send(e);
	}
})

async function saveStorage(data) {
	let bulkOps = [];
	for (var i = 0; i < data.length; i++) {
		if (data[i]._id) {
			let normalizedData = normalizeStorage(data[i]);
			let model = new StorageModel(normalizedData);
			bulkOps.push({
				updateOne: {
					filter: { _id: model._id },
					update: model,
					upsert: true
				}
			});
		}
	}

	try {
		await StorageModel.collection.bulkWrite(bulkOps);
		console.log("Bulk update ok");
		return "saveCurrencyAccount: Success";
	} catch (err) {
		console.error('Bulk update error', err);
		return "saveCurrencyAccount: Failed";
	}

}

export default router;