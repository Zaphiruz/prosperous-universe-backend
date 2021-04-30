import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const StarSchema = Schema(
	{
		_id: String,
		address: {
			lines: [{
				type: String,
				ref: 'Entity'
			}]
		},
		connections: [{
			type: String,
			ref: 'Star'
		}],
		name: String,
		position: {
			x: Number,
			y: Number,
			Z: Number
		},
		sectorId: String,
		subSectorId: String,
		systemId: String,
		type: String,
		distances: {
			toMoria: Number,
			toHortus: Number,
			toBenten: Number,
			toAntares: Number
        }
	}
);

export const StarModel = Model('Stars', StarSchema);
export const StarTC = composeWithMongoose(StarModel);