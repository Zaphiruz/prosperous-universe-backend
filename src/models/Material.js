import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const MaterialSchema = Schema(
	{
		category: String,
		id: String,
		name: String,
		ticker: String,
		volume: Number,
		weight: Number
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const MaterialModal = Model('Materials', MaterialSchema);
export const MaterialTC = composeWithMongoose(MaterialModal);
