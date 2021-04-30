import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { ItemDetails, normalizeItemDetails } from './shared/repair-material';

export const ShipStorageTypes = [
	'SHIP_STORE',
	'STL_FUEL_STORE',
	'FTL_FUEL_STORE'
]

const StorageShipSchema = Schema(
	{
		_id: String,
		id: String,
		name: String,
		fixed: Boolean,
		locked: Boolean,
		rank: Number,
		tradeStore: Boolean,
		type: { type: String },
		volumeCapacity: Number,
		volumeLoad: Number,
		weightCompacity: Number,
		weightLoad: Number,
		items: [ItemDetails],
		owner: {
			type: String,
			ref: 'Company'
		},
		addressableId: {
			type: String,
			refPath: 'Ship'
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const StorageShipModel = Model('StorageShips', StorageShipSchema, 'storageShips');
export const StorageShipTC = composeWithMongoose(StorageShipModel);

export function normalizeStorageShip(obj) {
	return {
		...obj,
		_id: obj.id,
		items: obj.items.map(normalizeItemDetails)
	}
}
