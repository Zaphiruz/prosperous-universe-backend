import express, { request } from 'express';
const router = express.Router();
import { WorkforceModel, normalizeWorkforce } from '../models/workforce';
import { write as bulkWrite } from '../utils/bulkOps';

const bulkWriteWorkforces = bulkWrite(WorkforceModel);

router.post('/', async (req, res) => {
	try {
		console.log("Received workforce request");

		let input = Object.values(req.body)
			.map(normalizeWorkforce);

		return res.send(await bulkWriteWorkforces(input));
	} catch (e) {
		console.error(e);
		return res.status(400).send(e);
	}
})

export default router;