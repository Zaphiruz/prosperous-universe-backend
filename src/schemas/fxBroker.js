import { FxBrokerTC } from '../models/fxBroker';
import { CurrencyTC } from '../models/currency';

export const FxBrokerQuery = {
	fxBrokerById: FxBrokerTC.getResolver('findById'),
	fxBrokerByIds: FxBrokerTC.getResolver('findByIds'),
	fxBrokerOne: FxBrokerTC.getResolver('findOne'),
	fxBrokerMany: FxBrokerTC.getResolver('findMany'),
	fxBrokerCount: FxBrokerTC.getResolver('count'),
	fxBrokerConnection: FxBrokerTC.getResolver('connection'),
	fxBrokerPagination: FxBrokerTC.getResolver('pagination'),
};

export const FxBrokerMutation = {
	fxBrokerCreateOne: FxBrokerTC.getResolver('createOne'),
	fxBrokerCreateMany: FxBrokerTC.getResolver('createMany'),
	fxBrokerUpdateById: FxBrokerTC.getResolver('updateById'),
	fxBrokerUpdateOne: FxBrokerTC.getResolver('updateOne'),
	fxBrokerUpdateMany: FxBrokerTC.getResolver('updateMany'),
	fxBrokerRemoveById: FxBrokerTC.getResolver('removeById'),
	fxBrokerRemoveOne: FxBrokerTC.getResolver('removeOne'),
	fxBrokerRemoveMany: FxBrokerTC.getResolver('removeMany'),
};

FxBrokerTC.addRelation('base', {
	resolver: CurrencyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.base
	},
	projection: { base: true }
});

FxBrokerTC.addRelation('quote', {
	resolver: CurrencyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.quote
	},
	projection: { quote: true }
});