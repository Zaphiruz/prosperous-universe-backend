import express, { request } from 'express';
const router = express.Router();
import { WorkforceModel } from '../models/workforce';

router.post('/', async (req, res) => {
	try {
		console.log("Received workforce request");

		let input = [];

		for (let key in req.body) {
			delete "address" in req.body[key];
			input.push(req.body[key]);
		}

		saveWorkforce(input);

		return res.send("Workforce request: Success");
	} catch (e) {
		console.error(e);
		return res.status(400).send(e);
	}
})

async function saveWorkforce(data) {
	//let normalizedData = normalizeStorage(data);
	//console.log(normalizedData)

	let bulkOps = [];

	for (var i = 0; i < data.length; i++) {
		if (data[i]._id) {
			let model = new WorkforceModel(data[i]);
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
		await WorkforceModel.collection.bulkWrite(bulkOps);
		console.log("Bulk update ok");
		return "saveWorkforce: Success";
	} catch (err) {
		console.error('Bulk update error', err);
		return "saveWorkforce: Failed";
	}
}

export default router;