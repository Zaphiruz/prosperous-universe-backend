import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const OperatorSchema = Schema(
	{
		_id: String,
		_type: String,
		id: String,
		name: String,
		code: String
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const OperatorModel = Model('Operators', OperatorSchema);
export const OperatorTC = composeWithMongoose(OperatorModel);