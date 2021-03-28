import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { ItemDetails, normalizeItemDetails } from './shared/repair-material';

const StorageSchema = Schema(
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
		// TODO: resolve mixed type as union?
		// addressableId: { // if type === 'STORE', its a site. else, a ship
		// 	type: String,
		// 	refPath: 'type'
		// },
		addressableId: String
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const StorageModel = Model('Storages', StorageSchema);
export const StorageTC = composeWithMongoose(StorageModel);

export function normalizeStorage(obj) {
	return {
		...obj,
		_id: obj.id,
		items: obj.items.map(normalizeItemDetails)
	}
}
