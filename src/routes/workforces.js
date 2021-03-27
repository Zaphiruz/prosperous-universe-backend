import express, { request } from 'express';
const router = express.Router();
import { WorkforceModel } from '../models/workforce';
import { write as bulkWrite } from '../utils/bulkOps';

const bulkWriteWorkforces = bulkWrite(WorkforceModel);

router.post('/', async (req, res) => {
	try {
		console.log("Received workforce request", req.body);

		let input = [];

		for (var key in req.body) {
			delete "address" in req.body[key];
			input.push(req.body[key]);
		}

		await bulkWriteWorkforces(input)

		return res.send("Workforce request: Success");
	} catch (e) {
		console.error(e);
		return res.status(400).send(e);
	}
})

export default router;