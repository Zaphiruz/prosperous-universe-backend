import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const CategorySchema = Schema(
	{
		_id: String,
		id: String,
		name: String,
		materials: [{
			type: String,
			ref: "Material"
		}]
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const CategoryModel = Model('Categories', CategorySchema);
export const CategoryTC = composeWithMongoose(CategoryModel);
