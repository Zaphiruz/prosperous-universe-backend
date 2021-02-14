import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const EntitySchema = Schema(
	{
		_id: String,
		id: String,
		_type: String,
		name: String,
		naturalId: String
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const EntityModel = Model('Entities', EntitySchema);
export const EntityTC = composeWithMongoose(EntityModel);
