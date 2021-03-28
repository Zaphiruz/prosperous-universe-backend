import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const WorkforcePopulation = {
	capacity: Number,
	level: String,
	population: Number,
	required: Number,
	reserve: Number,
	satisfaction: Number,
	needs: {
		type: String,
		ref: 'Need'
	}
}

const WorkforceSchema = Schema(
	{
		_id: String,
		workforces: [WorkforcePopulation],
		owner: {
			type: String,
			ref: 'Company'
		},
		siteId: {
			type: String,
			ref: 'Site'
		},
		address: [{
			type: String,
			ref: 'Entity'
		}]
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const WorkforceModel = Model('Workforces', WorkforceSchema);
export const WorkforceTC = composeWithMongoose(WorkforceModel);