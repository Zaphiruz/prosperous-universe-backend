import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const SubScore = {
	rating: String,
	score: String
}

const CompanySchema = Schema(
	{
		_id: String,
		id: String,
		name: String,
		code: String,
		startingProfile: String,
		ratingReport: {
			overallRating: String,
			subRatings: [SubScore]
		},

		ownCurrency: {
			type: String,
			ref: 'Currency'
		},
		country: {
			type: String,
			ref: 'Country'
		},
		currencyAccounts: [{
			type: String,
			ref: 'CurrencyAccount'
		}],
		startingLocation: [{
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

export const CompanyModel = Model('Companies', CompanySchema);
export const CompanyTC = composeWithMongoose(CompanyModel);
