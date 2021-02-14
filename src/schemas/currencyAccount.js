import { CurrencyAccountTC } from '../models/currencyAccount';
import { CurrencyTC } from '../models/currency';

export const CurrencyAccountQuery = {
	currencyAccountById: CurrencyAccountTC.getResolver('findById'),
	currencyAccountByIds: CurrencyAccountTC.getResolver('findByIds'),
	currencyAccountOne: CurrencyAccountTC.getResolver('findOne'),
	currencyAccountMany: CurrencyAccountTC.getResolver('findMany'),
	currencyAccountCount: CurrencyAccountTC.getResolver('count'),
	currencyAccountConnection: CurrencyAccountTC.getResolver('connection'),
	currencyAccountPagination: CurrencyAccountTC.getResolver('pagination'),
};

export const CurrencyAccountMutation = {
	currencyAccountCreateOne: CurrencyAccountTC.getResolver('createOne'),
	currencyAccountCreateMany: CurrencyAccountTC.getResolver('createMany'),
	currencyAccountUpdateById: CurrencyAccountTC.getResolver('updateById'),
	currencyAccountUpdateOne: CurrencyAccountTC.getResolver('updateOne'),
	currencyAccountUpdateMany: CurrencyAccountTC.getResolver('updateMany'),
	currencyAccountRemoveById: CurrencyAccountTC.getResolver('removeById'),
	currencyAccountRemoveOne: CurrencyAccountTC.getResolver('removeOne'),
	currencyAccountRemoveMany: CurrencyAccountTC.getResolver('removeMany'),
};

CurrencyAccountTC.addRelation('currency', {
	resolver: CurrencyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.currency
	},
	projection: { currency: true }
});

CurrencyAccountTC.addRelation('bookCurrency', {
	resolver: CurrencyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.bookCurrency
	},
	projection: { bookCurrency: true }
});