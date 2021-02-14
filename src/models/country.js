import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const CountrySchema = Schema(
	{
		_id: String,
		id: String,
		code: String,
		color: Number,
		name: String,
		currency: {
			type: String,
			ref: 'Currency'
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const CountryModel = Model('Countries', CountrySchema);
export const CountryTC = composeWithMongoose(CountryModel);
