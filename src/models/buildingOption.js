import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import RepairMaterial from './shared/repair-material';

const BuildingOptionSchema = Schema(
	{
		_id: String,
		id: String,
		name: String,
		ticker: String,
		type: { type: String },
		area: Number,
		expertiseCategory: String,
		needsFertileSoil: Boolean,
		workforceCapacities: [{
			level: String,
			capacity: Number,
		}],
		materials: {
			quantities: [RepairMaterial],
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const BuildingOptionModel = Model('BuildingOption', BuildingOptionSchema, 'buildingOptions');
export const BuildingOptionTC = composeWithMongoose(BuildingOptionModel);
