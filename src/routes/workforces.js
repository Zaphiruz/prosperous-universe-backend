import express, { request } from 'express';
const router = express.Router();
import { WorkforceModel } from '../models/workforce';
import { write as bulkWrite } from '../utils/bulkOps';

const bulkWriteWorkforces = bulkWrite(WorkforceModel);

router.post('/', async (req, res) => {
	try {
		console.log("Received workforce request");

		let input = [];

		for (let key in req.body) {
			delete "address" in req.body[key];
			input.push(req.body[key]);
		}
		return res.send(await bulkWriteWorkforces(input));
	} catch (e) {
		console.error(e);
		return res.status(400).send(e);
	}
})

export default router;