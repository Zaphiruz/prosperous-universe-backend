import { CurrencyTC } from '../models/currency';

export const CurrencyQuery = {
	currencyById: CurrencyTC.getResolver('findById'),
	currencyByIds: CurrencyTC.getResolver('findByIds'),
	currencyOne: CurrencyTC.getResolver('findOne'),
	currencyMany: CurrencyTC.getResolver('findMany'),
	currencyCount: CurrencyTC.getResolver('count'),
	currencyConnection: CurrencyTC.getResolver('connection'),
	currencyPagination: CurrencyTC.getResolver('pagination'),
};

export const CurrencyMutation = {
	currencyCreateOne: CurrencyTC.getResolver('createOne'),
	currencyCreateMany: CurrencyTC.getResolver('createMany'),
	currencyUpdateById: CurrencyTC.getResolver('updateById'),
	currencyUpdateOne: CurrencyTC.getResolver('updateOne'),
	currencyUpdateMany: CurrencyTC.getResolver('updateMany'),
	currencyRemoveById: CurrencyTC.getResolver('removeById'),
	currencyRemoveOne: CurrencyTC.getResolver('removeOne'),
	currencyRemoveMany: CurrencyTC.getResolver('removeMany'),
};