import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import Timestamp from './shared/timestamp';

const SiteSchema = Schema(
	{
		_id: String,
		siteId: String,
		area: Number,
		founded: Timestamp,
		owner: {
			type: String,
			ref: 'Company'
		},
		address:[{
			type: String,
			ref: 'Entity'
		}],
		platforms: [{
			type: String,
			ref: 'Building'
		}],
		updatedAt: Number
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

export const SiteModel = Model('Sites', SiteSchema);
export const SiteTC = composeWithMongoose(SiteModel);
