import { CxBrokerTC } from '../models/cxBroker';
import { CurrencyTC } from '../models/currency';
import { MaterialTC } from '../models/material';
import { ExchangeTC } from '../models/exchange';
import { OrderTC } from '../models/order';

export const CxBrokerQuery = {
	cxBrokerById: CxBrokerTC.getResolver('findById'),
	cxBrokerByIds: CxBrokerTC.getResolver('findByIds'),
	cxBrokerOne: CxBrokerTC.getResolver('findOne'),
	cxBrokerMany: CxBrokerTC.getResolver('findMany')
		.addFilterArg({
			name: 'tickers',
			type: '[String]',
			description: 'Search by tickers',
			query: (broker, tickers) => {
				broker.ticker = { $in: tickers }
			}
		})
		.addFilterArg({
			name: 'materials',
			type: '[String]',
			description: 'Search by materials',
			query: (broker, materials) => {
				broker.material = { $in: materials }
			}
		}),
	cxBrokerCount: CxBrokerTC.getResolver('count'),
	cxBrokerConnection: CxBrokerTC.getResolver('connection'),
	cxBrokerPagination: CxBrokerTC.getResolver('pagination'),
};

export const CxBrokerMutation = {
	cxBrokerCreateOne: CxBrokerTC.getResolver('createOne'),
	cxBrokerCreateMany: CxBrokerTC.getResolver('createMany'),
	cxBrokerUpdateById: CxBrokerTC.getResolver('updateById'),
	cxBrokerUpdateOne: CxBrokerTC.getResolver('updateOne'),
	cxBrokerUpdateMany: CxBrokerTC.getResolver('updateMany'),
	cxBrokerRemoveById: CxBrokerTC.getResolver('removeById'),
	cxBrokerRemoveOne: CxBrokerTC.getResolver('removeOne'),
	cxBrokerRemoveMany: CxBrokerTC.getResolver('removeMany'),
};

CxBrokerTC.addRelation('currency', {
	resolver: CurrencyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.currency
	},
	projection: { currency: true }
});

CxBrokerTC.addRelation('material', {
	resolver: MaterialTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.material
	},
	projection: { material: true }
});

CxBrokerTC.addRelation('exchange', {
	resolver: ExchangeTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.exchange
	},
	projection: { exchange: true }
});

CxBrokerTC.addRelation('buyingOrders', {
	resolver: OrderTC.getResolver('findByIds'),
	prepareArgs: {
		_ids: source => source.buyingOrders
	},
	projection: { buyingOrders: true }
});

CxBrokerTC.addRelation('sellingOrders', {
	resolver: OrderTC.getResolver('findByIds'),
	prepareArgs: {
		_ids: source => source.sellingOrders
	},
	projection: { sellingOrders: true }
});
