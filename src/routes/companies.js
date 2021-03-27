import express, { request } from 'express';
const router = express.Router();
import { CompanyModel } from '../models/company';
import { CurrencyAccountModel } from '../models/currencyAccount';

router.post('/', async (req, res) => {
	try {
		console.log("Received request");

		var requestBody = req.body;
		var companyId = req.body.id;

		// Set the MongoDB required ID
		requestBody._id = requestBody.id;

		// Clean up address
		var addresses = [];	// <---- Need to send along to another function to upload to Mongo
		var addressesToAddBack = [];
		for (var i = 0; i < requestBody.startingLocation.lines.length; i++) {
			// Set _id for Mongo
			requestBody.startingLocation.lines[i]._id = requestBody.startingLocation.lines[i].entity.id;

			// Push location id to array
			addressesToAddBack.push(requestBody.startingLocation.lines[i]._id);

			// Push object to array
			addresses.push(requestBody.startingLocation.lines[i]);
		}

		// Overwrite the startingLocation object
		requestBody.startingLocation = addressesToAddBack;

		// Pull out the currencies for their own upload
		var currencies = [];	// <---- Need to send along to another function to upload to Mongo
		for (var i = 0; i < requestBody.currencyAccounts.length; i++) {
			// Add key
			requestBody.currencyAccounts[i]._id = companyId.concat(".", requestBody.currencyAccounts[i].currencyBalance.currency);
			requestBody.currencyAccounts[i].id = requestBody.currencyAccounts[i]._id;

			// Add the currency key
			requestBody.currencyAccounts[i].currency = requestBody.currencyAccounts[i].currencyBalance.currency;

			// Add bookCurrency
			requestBody.currencyAccounts[i].bookCurrency = requestBody.currencyAccounts[i].bookBalance.currency;

			// Push to array
			currencies.push(requestBody.currencyAccounts[i]);

			// Overwrite old value
			requestBody.currencyAccounts[i] = companyId.concat(".", requestBody.currencyAccounts[i].currencyBalance.currency);
		}

		// remove Headquarters object for now
		if ("headquarters" in requestBody) {
			delete requestBody.headquarters;
		}

		// Update ownCurrency
		requestBody.ownCurrency = requestBody.ownCurrency.code;

		// Push objects to Mongo
		// Push Addresses
		saveCompany(requestBody);
		console.log(await saveCurrencyAccount(currencies));

		return res.send(requestBody);
	} catch (e) {
		console.error(e);
		return res.status(400).send(e);
	}
})

async function saveCompany(data) {
	//let normalizedData = normalizeStorage(data);
	//console.log(normalizedData)
	let model = new CompanyModel(data);
	if (data._id) {
		await model.updateOne({ _id: data._id }, data, { upsert: true }, function (err, doc) {
			if (err) return { err: err };
			return true;
		});
    }
}

async function saveCurrencyAccount(data) {  
	//let normalizedData = normalizeStorage(data);
	//console.log(normalizedData)

	let bulkOps = [];

	for (var i = 0; i < data.length; i++) { 
		if (data[i]._id) {
			let model = new CurrencyAccountModel(data[i]);
			bulkOps.push({
				updateOne: {
					filter: { _id: model._id},
					update: model,
					upsert: true
				}
			});
        }
	}

	try {
		await CurrencyAccountModel.collection.bulkWrite(bulkOps);
		console.log("Bulk update ok");
		return "saveCurrencyAccount: Success";
	} catch(err) {
		console.error('Bulk update error', err);
		return "saveCurrencyAccount: Failed";
	}
}

export default router;