import express from 'express';
const router = express.Router();
import { SiteModel } from '../models/site';
import { EntityModel } from '../models/entity';
import { BuildingModel } from '../models/building';
import { write as bulkWrite } from '../utils/bulkOps';

const bulkWriteSite = bulkWrite(SiteModel);
const bulkWriteEntity = bulkWrite(EntityModel);
const bulkWriteBuilding = bulkWrite(BuildingModel);

router.post('/', async (req, res) => {
	console.log("Recieved sites request")
	try {
		let sites = [];
		let buildings = [];
		let entities = [];
		let addresses = []; // TODO: add to bulk exporter

		for (let key in req.body) {
			req.body[key]._id = key;

			// Adust address
			let lines = [];
            for (let i = 0;  i < req.body[key].address.lines.length; i++) {
				req.body[key].address.lines[i]._id = req.body[key].address.lines[i].entity.id;
				entities.push(req.body[key].address.lines[i]);
				lines.push(req.body[key].address.lines[i]._id);
			}
			req.body[key].address = lines;

			// Adjust platforms
			if ('platforms' in req.body[key]) {
				for (let i = 0; i < req.body[key].platforms.length; i++) {
					req.body[key].platforms[i]._id = req.body[key].platforms[i].id;
					req.body[key].platforms[i].owner = req.body[key].owner;
					buildings.push(req.body[key].platforms[i]);
				}
            }
			
			delete req.body[key].buildOptions;

			let model = SiteModel(req.body[key]);
			sites.push(model);
		}

		let siteRecords = await bulkWriteSite(sites);
		let entitiesRecords = await bulkWriteEntity(entities);
		let buildingsRecords = await bulkWriteBuilding(buildings);
		return res.send({ siteRecords, entitiesRecords, buildingsRecords});
	} catch (e) {
		console.error(e);
		return res.status(400).send(e);
	}
})

export default router;