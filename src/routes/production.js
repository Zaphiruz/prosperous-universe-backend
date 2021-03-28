import express, { request } from 'express';
const router = express.Router();
import { ProductionLineModel } from '../models/productionLine';
import { write as bulkWrite } from '../utils/bulkOps';

const bulkWriteProductionLine = bulkWrite(ProductionLineModel);

router.post('/', async (req, res) => {
	try {
		console.log("Received production request");

		let output = [];
		for (let key in req.body) {
			// Add _id
			req.body[key]._id = req.body[key].id;

			// Adjusting address
			let entities = [];
			for (let i = 0; i < req.body[key].address.lines.length; i++) {
				entities.push(req.body[key].address.lines[i].entity.id);
			}
			req.body[key].address = entities;

			// Adjust orders.inputs 
			for (let i = 0; i < req.body[key].orders.length; i++) {
				for (let x = 0; x < req.body[key].orders[i].inputs.length; x++) {
					req.body[key].orders[i].inputs[x].material = req.body[key].orders[i].inputs[x].material.id;
				}
				for (let x = 0; x < req.body[key].orders[i].outputs.length; x++) {
					req.body[key].orders[i].outputs[x].material = req.body[key].orders[i].outputs[x].material.id;
				}
            }

			// Adjust orders
			for (let i = 0; i < req.body[key].orders.length; i++) {
				req.body[key].orders[i].productionFeeCollector = req.body[key].orders[i].productionFeeCollector.id;
			}

			// Adjust materials
			for (let i = 0; i < req.body[key].productionTemplates.length; i++) {
				for (let x = 0; x < req.body[key].productionTemplates[i].inputFactors.length; x++) {
					req.body[key].productionTemplates[i].inputFactors[x].material = req.body[key].productionTemplates[i].inputFactors[x].material.id;
				}
				for (let x = 0; x < req.body[key].productionTemplates[i].outputFactors.length; x++) {
					req.body[key].productionTemplates[i].outputFactors[x].material = req.body[key].productionTemplates[i].outputFactors[x].material.id;
				}
				req.body[key].productionTemplates[i].productionFeeCollector = req.body[key].productionTemplates[i].productionFeeCollector.id;
			}
			output.push(req.body[key]);
		}

		return res.send(await bulkWriteProductionLine(output));
	} catch (e) {
		console.error(e);
		return res.status(400).send(e);
	}
});

export default router;