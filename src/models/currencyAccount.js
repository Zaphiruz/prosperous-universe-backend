import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import Price from './shared/price';

const CurrencyAccountSchema = Schema(
	{
		_id: String,
		id: String,
		bookBalance: Price,
		currencyBalance: Price,
		category: String,
		number: Number,
		type: Number,
		currency: {
			type: String,
			ref: 'Currency'
		},
		bookCurrency: {
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

export const CurrencyAccountModel = Model('CurrencyAccounts', CurrencyAccountSchema, 'currencyAccounts');
export const CurrencyAccountTC = composeWithMongoose(CurrencyAccountModel);