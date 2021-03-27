import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const SubScore = Schema(
	{
		rating: String,
		score: String
	}
)

const RatingReport = Schema(
	{
		overallRating: String,
		subRatings: [SubScore]
	}
)

const CompanySchema = Schema(
	{
		_id: String,
		id: String,
		name: String,
		code: String,
		startingProfile: String,
		ratingReport: RatingReport,

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
