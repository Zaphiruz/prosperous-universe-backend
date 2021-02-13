import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const CurrencySchema = Schema(
	{
		_id: String,
		code: String,
		name: String,
		decimals: Number,
		numericCode: Number,
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const CurrencyModel = Model('Currencies', CurrencySchema);
export const CurrencyTC = composeWithMongoose(CurrencyModel);
