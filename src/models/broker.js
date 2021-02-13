import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import PriceSchema from './shared/price';
import BidSchema from './shared/bid';

const BrokerSchema = Schema(
	{
		_id: String,
		id: String,
		ticker: String,
		allTimeHigh: PriceSchema,
		allTimeLow: PriceSchema,
		high: PriceSchema,
		low: PriceSchema,
		narrowPriceBand: PriceSchema,
		widePriceBand: PriceSchema,
		previous: PriceSchema,
		price: PriceSchema,
		volume: PriceSchema,
		ask: BidSchema,
		bid: BidSchema,
		traded: Number,
		supply: Number,
		demand: Number,
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