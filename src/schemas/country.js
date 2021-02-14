import { CountryTC } from '../models/country';
import { CurrencyTC } from '../models/currency';

export const CountryQuery = {
	countryById: CountryTC.getResolver('findById'),
	countryByIds: CountryTC.getResolver('findByIds'),
	countryOne: CountryTC.getResolver('findOne'),
	countryMany: CountryTC.getResolver('findMany'),
	countryCount: CountryTC.getResolver('count'),
	countryConnection: CountryTC.getResolver('connection'),
	countryPagination: CountryTC.getResolver('pagination'),
};

export const CountryMutation = {
	countryCreateOne: CountryTC.getResolver('createOne'),
	countryCreateMany: CountryTC.getResolver('createMany'),
	countryUpdateById: CountryTC.getResolver('updateById'),
	countryUpdateOne: CountryTC.getResolver('updateOne'),
	countryUpdateMany: CountryTC.getResolver('updateMany'),
	countryRemoveById: CountryTC.getResolver('removeById'),
	countryRemoveOne: CountryTC.getResolver('removeOne'),
	countryRemoveMany: CountryTC.getResolver('removeMany'),
};

CountryTC.addRelation('currency', {
	resolver: CurrencyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.currency
	},
	projection: { currency: true }
});