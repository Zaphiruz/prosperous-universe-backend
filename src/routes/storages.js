import express from 'express';
import { partition } from 'lodash'
const router = express.Router();
import { StorageShipModel, normalizeStorageShip, ShipStorageTypes } from '../models/storageShip';
import { StorageSiteModel, normalizeStorageSite, SiteStorageTypes } from '../models/storageSite';
import { write as bulkWrite } from '../utils/bulkOps';

const bulkWriteSiteStorages = bulkWrite(StorageSiteModel);
const bulkWriteShipStorages = bulkWrite(StorageShipModel);

router.post('/', async (req, res) => {
	console.log("Recieved storages request")
	try {
		let data = Object.values(req.body).filter((item) => { item.type !== "SHIPMENT"});
		let [ships, sites] = partition(data, ({ type }) => ShipStorageTypes.includes(type));

		console.log(ships.length, sites.length)
		let siteRecords = await bulkWriteSiteStorages(sites.map(normalizeStorageSite));
		let shipRecords = await bulkWriteShipStorages(ships.map(normalizeStorageShip));
		return res.send({siteRecords, shipRecords});
	} catch(e) {
		console.error(e);
		return res.status(400).send(e);
	}
})

export default router;