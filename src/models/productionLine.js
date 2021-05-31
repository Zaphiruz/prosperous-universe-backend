// model
import { Schema, model as Model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { ValuableMaterial } from './shared/repair-material';
import { Millis, Timestamp } from './shared/timestamp';
import Price from './shared/price';

const ProductionLineSchema = Schema(
	{
		_id: String,
		id: String,
		owner: String,
		siteId: String,
		address: [{
			type: String,
			ref: 'Entity'
		}],
		type: { type: String },
		capacity: Number,
		slots: Number,
		efficiency: Number,
		condition: Number,
		workforces: [{
			level: String,
			efficiency: Number
		}],
		orders: [{
			completed: Number,
			completion: Boolean,
			created: Timestamp,
			duration: Millis,
			halted: Boolean,
			inputs: [ValuableMaterial],
			outputs: [ValuableMaterial],
			productionFee: Price,
			productionFeeCollector: {
				type: String,
				ref: 'Operator'
			},
			productionLineId: String,
			recurring: Boolean,
			started: Boolean
		}],
		productionTemplates: [{
			duration: Millis,
			efficiency: Number,
			effortFactor: Number,
			id: String,
			inputFactors: [{
				factor: Number,
				material: {
					type: String,
					ref: 'Material'
				}
			}],
			outputFactors: [{
				factor: Number,
				material: {
					type: String,
					ref: 'Material'
				}
			}],
			productionFeeCollector: {
				type: String,
				ref: 'Operator'
			},
			productionFeeFactor: Price
		}],
	  //efficiencyFactors
		efficiencyFactors: [{
			effectivity: Number,
			expertiseCategory: String,
			type: { type: String },
			value: Number
		}],
		createdAt: { type: Date, default: Date.Now },
		updatedAt: Number
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

//ProductionLineSchema.pre("update", () => {
//	this.update({}, { $set: { updatedAt: new Date() } });
//	console.log("Should be working? 1");
//	next();
//});
//ProductionLineSchema.pre("updateMany", { document: true, query: false }, () => {
//	this.update({}, { $set: { updatedAt: new Date() } });
//	console.log("Should be working? 2");
//	next();
//});
ProductionLineSchema.pre("update", function (next) {
	console.log("Should be working? 2");
	this.update({}, { $set: { updatedAt: new Date() } });
	next();
});
ProductionLineSchema.pre("updateOne", { document: true, query: false }, () => {
	console.log("Should be working? 2");
	this.update({}, { $set: { updatedAt: new Date() } });
});
//ProductionLineSchema.pre("update", () => {
//	this.update({}, { $set: { updated_at: new Date() } });
//	console.log("Should be working? 1");
//	next();
//});
//ProductionLineSchema.pre("updateMany", { document: true, query: false }, () => {
//	this.update({}, { $set: { updated_at: new Date() } });
//	console.log("Should be working? 2");
//	next();
//});
//ProductionLineSchema.pre("updateOne", { document: true, query: false }, () => {
//	this.update({}, { $set: { updated_at: new Date() } });
//	console.log("Should be working? 2");
//	next();
//});



export const ProductionLineModel = Model('ProductionLines', ProductionLineSchema, 'productionLine');
export const ProductionLineTC = composeWithMongoose(ProductionLineModel);