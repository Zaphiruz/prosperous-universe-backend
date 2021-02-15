import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { ValuableMaterial } from './shared/repair-material';

const ItemDetails = Schema (
	{
		id: String,
		quantity: ValuableMaterial,
		type: String,
		volume: Number,
		weight: Number,
	}
)

const StorageSchema = Schema(
	{
		_id: String,
		id: String,
		name: String,
		fixed: Boolean,
		locked: Boolean,
		rank: Number,
		tradeStore: Boolean,
		type: String,
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
		// }
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
