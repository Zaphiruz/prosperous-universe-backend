import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const PopulationNeeds = {
	category: String,
	essential: Boolean,
	satisfaction: Number,
	unitsPer100: Number,
	material: {
		type: String,
		ref: 'Material'
	}
}


const NeedSchema = Schema(
	{
		_id: String,
		needs: [PopulationNeeds]
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const NeedModel = Model('Needs', NeedSchema);
export const NeedTC = composeWithMongoose(NeedModel);