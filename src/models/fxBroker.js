import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import Timestamp from './shared/timestamp';
import Price from './shared/price';

const CurrencyPrice = {
	base: String,
	decimals: Number,
	quote: String,
	rate: Number
}

const FxBroker = Schema(
	{
		_id: String,
		brokerId: String,
		pair: {
			base: {
				type: String,
				ref: 'Currency'
			},
			quote: {
				type: String,
				ref: 'Currency'
			},
		},
		decimals: Number,
		price: {
			high: CurrencyPrice,
			low: CurrencyPrice,
			open: CurrencyPrice,
			close: CurrencyPrice,
			previous: CurrencyPrice,
			time: Timestamp,
			traded: Price,
			volume: Price
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const FxBrokerModel = Model('FxBrokers', FxBroker, 'fxBrokers');
export const FxBrokerTC = composeWithMongoose(FxBrokerModel);

export function normalizeFxBroker(obj) {
	return {
		...obj,
		_id: obj.brokerId,
		pair: {
			...obj.pair,
			base: obj.pair.base.code,
			quote: obj.pair.quote.code,
		}
	}
}
