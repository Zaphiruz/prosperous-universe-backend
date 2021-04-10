import express, { request } from 'express';
const router = express.Router();
import { CorpOrderModel, normalizeCorpOrder } from '../models/corpOrder';
import { write as bulkWrite } from '../utils/bulkOps';

const bulkWriteCorpOrders = bulkWrite(CorpOrderModel);

router.post('/', async (req, res) => {
	try {
		console.log("Received corpOrder request");

		let data = Array.isArray(req.body) ? req.body : [];
		console.log(data.length);
		let normalized = data.map(normalizeCorpOrder)
		let results = await bulkWriteCorpOrders(normalized);

		return res.send({bulkWriteCorpOrders: results})
	} catch(err) {
		console.error(err);
		return res.status(400).send(err);
	}
})

export default router;