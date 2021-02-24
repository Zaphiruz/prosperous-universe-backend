import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const MaterialSchema = Schema(
	{
		_id: String,
		id: String,
		name: String,
		ticker: String,
		volume: Number,
		weight: Number,
		category: {
			type: String,
			ref: 'Category'
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const MaterialModel = Model('Materials', MaterialSchema);
export const MaterialTC = composeWithMongoose(MaterialModel);
