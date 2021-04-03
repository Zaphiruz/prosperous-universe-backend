import { Schema, model as Model } from 'mongoose';
import { ValuableMaterial, normalizeMaterial } from './shared/repair-material';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const CorpOrderSchema = Schema(
	{
		_id: String,
		id: String,
		dateOfRequest: Date,
		dateOfFullfillment: Date,
		desiredFullfillmentDate: Date,
		fullfilled: Boolean,
		claimed: Boolean,
		order: ValuableMaterial,
		requestee: {
			type: String,
			ref: 'Company'
		},
		fullfiller: {
			type: String,
			ref: 'Company'
		}
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
)

export const CorpOrderModel = Model('CorpOrders', CorpOrderSchema, 'corpOrders');
export const CorpOrderTC = composeWithMongoose(CorpOrderModel);

export function normalizeCorpOrder(data) {
	return {
		...data,
		_id: data.id,
		order: normalizeMaterial(data.order),
		requestee: data.requestee && data.requestee.id,
		fullfiller: data.fullfiller && data.fullfiller.id,
		fullfilled: !!data.dateOfFullfillment,
		claimed: !!data.fullfiller
	}
}