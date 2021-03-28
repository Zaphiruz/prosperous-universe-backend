import express from 'express';
const router = express.Router();
import { StorageModel, normalizeStorage } from '../models/storage';
import { write as bulkWrite } from '../utils/bulkOps';

const bulkWritestorages = bulkWrite(StorageModel);

router.post('/', async (req, res) => {
	console.log("Recieved storages request")
	try {
		// Check if dictionary
		let input = []
		if (req.body instanceof Object) {
			for (let key in req.body) {
				req.body[key]._id = req.body[key].id;
				input.push(req.body[key]);
			}
		} else {
			input.push(req.body);
		}
		return res.send(await bulkWritestorages(input));
	} catch(e) {
		console.error(e);
		return res.status(400).send(e);
	}
})

export default router;