import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import Price from './shared/price';
import Timestamp from './shared/timestamp';
import { RepairMaterial, normalizeMaterial } from './shared/repair-material';

const Module = {
	id: String,
	platformId: String,
	reactorId: String,
	reactorName: String,
	reactorTicker: String,
	type: { type: String},
}


const BuildingSchema = Schema(
	{
		_id: String,
		id: String,
		area: Number,
		bookValue: Price,
		condition: Number,
		creationTime: Timestamp,
		lastRepair: Timestamp,
		module: Module,
		repairMaterials: [RepairMaterial],
		reclaimableMaterials:  [RepairMaterial],
		owner: {
			type: String,
			ref: "Company"
		},
		siteId: {
			type: String,
			ref: 'Site'
		}
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const BuildingModel = Model('Buildings', BuildingSchema);
export const BuildingTC = composeWithMongoose(BuildingModel);

export const normalizeBuilding = (siteData) => (buildingData) => {
	return {
		...buildingData,
		_id: buildingData.id,
		owner: siteData.owner,
		repairMaterials: buildingData.repairMaterials.map(normalizeMaterial),
		reclaimableMaterials: buildingData.reclaimableMaterials.map(normalizeMaterial)
	}
}