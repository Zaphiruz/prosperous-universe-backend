import { CompanyTC } from '../models/company';
import { CurrencyTC } from '../models/currency';
import { CountryTC } from '../models/country'
import { EntityTC } from '../models/entity';
import { CurrencyAccountTC } from '../models/currencyAccount';

export const CompanyQuery = {
	companyById: CompanyTC.getResolver('findById'),
	companyByIds: CompanyTC.getResolver('findByIds'),
	companyOne: CompanyTC.getResolver('findOne'),
	companyMany: CompanyTC.getResolver('findMany'),
	companyCount: CompanyTC.getResolver('count'),
	companyConnection: CompanyTC.getResolver('connection'),
	companyPagination: CompanyTC.getResolver('pagination'),
};

export const CompanyMutation = {
	companyCreateOne: CompanyTC.getResolver('createOne'),
	companyCreateMany: CompanyTC.getResolver('createMany'),
	companyUpdateById: CompanyTC.getResolver('updateById'),
	companyUpdateOne: CompanyTC.getResolver('updateOne'),
	companyUpdateMany: CompanyTC.getResolver('updateMany'),
	companyRemoveById: CompanyTC.getResolver('removeById'),
	companyRemoveOne: CompanyTC.getResolver('removeOne'),
	companyRemoveMany: CompanyTC.getResolver('removeMany'),
};

CompanyTC.addRelation('ownCurrency', {
	resolver: CurrencyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.ownCurrency
	},
	projection: { ownCurrency: true }
});


CompanyTC.addRelation('country', {
	resolver: CountryTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.country
	},
	projection: { country: true }
});

CompanyTC.addRelation('currencyAccounts', {
	resolver: CurrencyAccountTC.getResolver('findByIds'),
	prepareArgs: {
		_ids: source => source.currencyAccounts
	},
	projection: { currencyAccounts: true }
});

CompanyTC.addRelation('startingLocation', {
	resolver: EntityTC.getResolver('findByIds'),
	prepareArgs: {
		_ids: source => source.startingLocation
	},
	projection: { startingLocation: true }
});
