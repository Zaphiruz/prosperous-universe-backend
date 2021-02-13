import { BrokerTC } from '../models/broker';
import { CurrencyTC } from '../models/currency';
import { MaterialTC } from '../models/material';
import { ExchangeTC } from '../models/exchange';

export const BrokerQuery = {
	brokerById: BrokerTC.getResolver('findById'),
	brokerByIds: BrokerTC.getResolver('findByIds'),
	brokerOne: BrokerTC.getResolver('findOne'),
	brokerMany: BrokerTC.getResolver('findMany'),
	brokerCount: BrokerTC.getResolver('count'),
	brokerConnection: BrokerTC.getResolver('connection'),
	brokerPagination: BrokerTC.getResolver('pagination'),
};

export const BrokerMutation = {
	brokerCreateOne: BrokerTC.getResolver('createOne'),
	brokerCreateMany: BrokerTC.getResolver('createMany'),
	brokerUpdateById: BrokerTC.getResolver('updateById'),
	brokerUpdateOne: BrokerTC.getResolver('updateOne'),
	brokerUpdateMany: BrokerTC.getResolver('updateMany'),
	brokerRemoveById: BrokerTC.getResolver('removeById'),
	brokerRemoveOne: BrokerTC.getResolver('removeOne'),
	brokerRemoveMany: BrokerTC.getResolver('removeMany'),
};

BrokerTC.addRelation('currency', {
	resolver: CurrencyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.currency
	},
	projection: { currency: true }
});

BrokerTC.addRelation('material', {
	resolver: MaterialTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.material
	},
	projection: { material: true }
});

BrokerTC.addRelation('exchange', {
	resolver: ExchangeTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.exchange
	},
	projection: { exchange: true }
});
