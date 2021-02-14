import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Millis, Timestamp } from './shared/timestamp';
import RepairMaterial from './shared/repair-material';

const ShipSchema = Schema(
	{
		_id: String,
		id: String,
		name: String,
		registration: String,
		acceleration: Number,
		commissioningTime: Timestamp,
		condition: Number,
		emitterPower: Number,
		reactorPower: Number,
		mass: Number,
		operatingEmptyMass: Number,
		operatingTimeFtl: Millis,
		operatingTimeStl: Millis,
		stlFuelFlowRate: Number,
		volume: Number,
		flightId: String,
		repairMaterials: [RepairMaterial],
		idShipStore: {
			type: String,
			ref: "Inventory"
		},
		idFtlFuelStore: {
			type: String,
			ref: "Inventory"
		},
		idStlFuelStore: {
			type: String,
			ref: "Inventory"
		},
		owner: {
			type: String,
			ref: "Company"
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const ShipModel = Model('Ships', ShipSchema);
export const ShipTC = composeWithMongoose(ShipModel);