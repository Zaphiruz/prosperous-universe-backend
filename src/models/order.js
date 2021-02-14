import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import Price from './shared/price';

const OrderSchema = Schema(
	{
		_id: String,
		id: String,
		amount: Number,
		limit: Price,
		trader: {
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

export const OrderModel = Model('Orders', OrderSchema);
export const OrderTC = composeWithMongoose(OrderModel);