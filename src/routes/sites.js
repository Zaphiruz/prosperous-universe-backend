import express from 'express';
const router = express.Router();
import { SiteModel } from '../models/site';
import { EntityModel } from '../models/entity';
import { BuildingModel, normalizeBuilding } from '../models/building';
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
			let siteObj = req.body[key];
			siteObj._id = key;

			// Adust address
			siteObj.address = siteObj.address.lines.map((addressBody) => {
				entities.push({
					...addressBody,
					_id: addressBody.entity.id
				});
				return addressBody.id;
			});

			// Adjust platforms
			if ('platforms' in siteObj) {
				buildings = siteObj.platforms.map(normalizeBuilding(siteObj))
				siteObj.platforms = buildings.map(building => building.id)
			}
			
			delete siteObj.buildOptions;

			siteObj.updatedAt = Date.now();

			let siteModel = SiteModel(siteObj);
			sites.push(siteModel);
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