import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const PlanetSchema = Schema(
	{
		_id: String,
		address: {
			lines: [{
				type: String,
				ref: 'Entity'
			}]
		},
		celestialBodies: [],
		cogcId: String,
		country: String,
		currency: String,
		data: {
			fertility: Number,
			gravity: Number,
			magneticField: Number,
			mass: Number,
			massEarth: Number,
			orbitIndex: Number,
			plots: Number,
			pressure: Number,
			radiation: Number,
			radius: Number,
			resources: [{
				factor: Number,
				type: { type: String },
				material: {
					type: String,
					ref: 'Material'
				}
			}],
			sunlight: Number,
			surface: Boolean,
			temperature: Number,
			takenPlots: Number
		},
		governor: String,
		id: String,
		name: String,
		nameable: Boolean,
		namer: String,
		namingDate: Date,
		naturalId: String,
		planetId: String,
		populationId: String,
		tier: {
			gravity: Number,
			pressure: Number,
			temperature: Number,
			planetTier: Number
        }
    }
);

export const PlanetModel = Model('Planets', PlanetSchema);
export const PlanetTC = composeWithMongoose(PlanetModel);