import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const CategorySchema = Schema(
	{
		id: String,
		name: String,
		materials: [String]
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
