import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const ExchangeSchema = Schema(
	{
		_id: String,
		id: String,
		name: String,
		code: String,
		currency: {
			type: String,
			ref: 'Currency'
		},
		operator: {
			type: String,
			ref: 'Operator'
		}
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const ExchangeModel = Model('Exchanges', ExchangeSchema);
export const ExchangeTC = composeWithMongoose(ExchangeModel);