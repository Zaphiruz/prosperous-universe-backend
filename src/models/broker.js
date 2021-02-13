import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import Price from './shared/price';
import Bid from './shared/bid';
import Timestamp from './shared/timestamp';

const BrokerSchema = Schema(
	{
		_id: String,
		id: String,
		ticker: String,
		allTimeHigh: Price,
		allTimeLow: Price,
		high: Price,
		low: Price,
		narrowPriceBand: Price,
		widePriceBand: Price,
		previous: Price,
		price: Price,
		volume: Price,
		ask: Bid,
		bid: Bid,
		traded: Number,
		supply: Number,
		demand: Number,
		priceTime: Timestamp,
		buyingOrders: [{
			type: String,
			ref: 'Order'
		}],
		sellingOrders: [{
			type: String,
			ref: 'Order'
		}],
		currency: {
			type: String,
			ref: 'Currency'
		},
		exchange: {
			type: String,
			ref: 'Exchange'
		},
		material: {
			type: String,
			ref: 'Material'
		}
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const BrokerModel = Model('Broker', BrokerSchema);
export const BrokerTC = composeWithMongoose(BrokerModel);