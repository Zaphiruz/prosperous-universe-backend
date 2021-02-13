import { ExchangeTC } from '../models/exchange';
import { CurrencyTC } from '../models/currency';
import { OperatorTC } from '../models/operator';

export const ExchangeQuery = {
	exchangeById: ExchangeTC.getResolver('findById'),
	exchangeByIds: ExchangeTC.getResolver('findByIds'),
	exchangeOne: ExchangeTC.getResolver('findOne'),
	exchangeMany: ExchangeTC.getResolver('findMany'),
	exchangeCount: ExchangeTC.getResolver('count'),
	exchangeConnection: ExchangeTC.getResolver('connection'),
	exchangePagination: ExchangeTC.getResolver('pagination'),
};

export const ExchangeMutation = {
	exchangeCreateOne: ExchangeTC.getResolver('createOne'),
	exchangeCreateMany: ExchangeTC.getResolver('createMany'),
	exchangeUpdateById: ExchangeTC.getResolver('updateById'),
	exchangeUpdateOne: ExchangeTC.getResolver('updateOne'),
	exchangeUpdateMany: ExchangeTC.getResolver('updateMany'),
	exchangeRemoveById: ExchangeTC.getResolver('removeById'),
	exchangeRemoveOne: ExchangeTC.getResolver('removeOne'),
	exchangeRemoveMany: ExchangeTC.getResolver('removeMany'),
};

ExchangeTC.addRelation('currency', {
	resolver: CurrencyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.currency
	},
	projection: { currency: true }
});

ExchangeTC.addRelation('operator', {
	resolver: OperatorTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.operator
	},
	projection: { operator: true }
});