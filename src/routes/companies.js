import express, { request } from 'express';
const router = express.Router();
import { CompanyModel } from '../models/company';
import { CurrencyAccountModel } from '../models/currencyAccount';
import { write as bulkWrite } from '../utils/bulkOps';

const bulkWriteCompany = bulkWrite(CompanyModel);
const bulkWriteAccounts = bulkWrite(CurrencyAccountModel);

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
		let currencies = [];	// <---- Need to send along to another function to upload to Mongo
		for (let i = 0; i < requestBody.currencyAccounts.length; i++) {
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

		// let currencies = requestBody.currencyAccounts.map((account) => {
		// 	let currencyBalance = account.currencyBalance.currency;
		// 	let id = companyId + '.' + currencyBalance;

		// 	return {
		// 		...account,
		// 		_id: id,
		// 		id,
		// 		currency: currencyBalance,
		// 		bookCurrency: account.bookBalance.currency
		// 	}
		// })

		// requestBody.currencyAccounts[i] = currencies.map(obj => obj.id)

		// remove Headquarters object for now
		delete requestBody.headquarters;

		// Update ownCurrency
		requestBody.ownCurrency = requestBody.ownCurrency.code;

		// Push objects to Mongo
		// Push Addresses
		await bulkWriteCompany(requestBody);
		await bulkWriteAccounts(currencies);

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

export default router;