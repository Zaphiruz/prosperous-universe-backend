import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { ItemDetails, normalizeItemDetails } from './shared/repair-material';

export const SiteStorageTypes = [
	'STORE',
	'WAREHOUSE_STORE'
]

const StorageSiteSchema = Schema(
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
			refPath: 'Site'
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const StorageSiteModel = Model('StorageSites', StorageSiteSchema, 'storageSites');
export const StorageSiteTC = composeWithMongoose(StorageSiteModel);

export function normalizeStorageSite(obj) {
	return {
		...obj,
		_id: obj.id,
		items: obj.items.map(normalizeItemDetails)
	}
}
