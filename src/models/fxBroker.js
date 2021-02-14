import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import Timestamp from './shared/timestamp';
import Price from './shared/price';

const CurrencyPrice = Schema(
	{
		base: String,
		decimals: Number,
		quote: String,
		rate: Number
	}
)

const FxBrokerPrice = Schema(
	{
		high: CurrencyPrice,
		low: CurrencyPrice,
		open: CurrencyPrice,
		previous: CurrencyPrice,
		time: Timestamp,
		traded: Price,
		volume: Price
	}
)

const FxBroker = Schema(
	{
		_id: String,
		brokerId: String,
		base: {
			type: String,
			ref: 'Currency'
		},
		quote: {
			type: String,
			ref: 'Currency'
		},
		decimals: Number,
		price: FxBrokerPrice,
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
