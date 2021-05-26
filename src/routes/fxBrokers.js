import express from 'express';
const router = express.Router();
import { FxBrokerModel, normalizeFxBroker } from '../models/fxBroker';
import { write as bulkWrite } from '../utils/bulkOps';

const bulkWriteFxBrokers = bulkWrite(FxBrokerModel);

router.post('/', async (req, res) => {
	try {
		console.log("Received fxBrokers request");

		let data = Array.isArray(req.body) ? req.body : [];
		let normalized = data.map(normalizeFxBroker)
		await bulkWriteFxBrokers(normalized);

		return res.send(normalized.map(normalized => normalized._id))
	} catch(err) {
		console.error(err);
		return res.status(400).send(err);
	}
})

export default router;