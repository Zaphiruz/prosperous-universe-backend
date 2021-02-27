import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import RepairMaterial from './shared/repair-material';

const Workforce = Schema(
	{
		level: String,
		capacity: Number,
	}
)

const MaterialsObject = Schema(
	{
		quantities: [RepairMaterial],
	}
)

const BuildingOptionSchema = Schema(
	{
		_id: String,
		id: String,
		name: String,
		ticker: String,
		type: String,
		area: Number,
		expertiseCategory: String,
		needsFertileSoil: Boolean,
		workforceCapacities: [Workforce],
		materials: MaterialsObject,
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
