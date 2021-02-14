import { OrderTC } from '../models/order';
import { OperatorTC } from '../models/operator';

export const OrderQuery = {
	orderById: OrderTC.getResolver('findById'),
	orderByIds: OrderTC.getResolver('findByIds'),
	orderOne: OrderTC.getResolver('findOne'),
	orderMany: OrderTC.getResolver('findMany'),
	orderCount: OrderTC.getResolver('count'),
	orderConnection: OrderTC.getResolver('connection'),
	orderPagination: OrderTC.getResolver('pagination'),
};

export const OrderMutation = {
	orderCreateOne: OrderTC.getResolver('createOne'),
	orderCreateMany: OrderTC.getResolver('createMany'),
	orderUpdateById: OrderTC.getResolver('updateById'),
	orderUpdateOne: OrderTC.getResolver('updateOne'),
	orderUpdateMany: OrderTC.getResolver('updateMany'),
	orderRemoveById: OrderTC.getResolver('removeById'),
	orderRemoveOne: OrderTC.getResolver('removeOne'),
	orderRemoveMany: OrderTC.getResolver('removeMany'),
};

OrderTC.addRelation('trader', {
	resolver: OperatorTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.trader
	},
	projection: { trader: true }
});