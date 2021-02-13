import { OperatorTC } from '../models/operator';

export const OperatorQuery = {
	operatorById: OperatorTC.getResolver('findById'),
	operatorByIds: OperatorTC.getResolver('findByIds'),
	operatorOne: OperatorTC.getResolver('findOne'),
	operatorMany: OperatorTC.getResolver('findMany'),
	operatorCount: OperatorTC.getResolver('count'),
	operatorConnection: OperatorTC.getResolver('connection'),
	operatorPagination: OperatorTC.getResolver('pagination'),
};

export const OperatorMutation = {
	operatorCreateOne: OperatorTC.getResolver('createOne'),
	operatorCreateMany: OperatorTC.getResolver('createMany'),
	operatorUpdateById: OperatorTC.getResolver('updateById'),
	operatorUpdateOne: OperatorTC.getResolver('updateOne'),
	operatorUpdateMany: OperatorTC.getResolver('updateMany'),
	operatorRemoveById: OperatorTC.getResolver('removeById'),
	operatorRemoveOne: OperatorTC.getResolver('removeOne'),
	operatorRemoveMany: OperatorTC.getResolver('removeMany'),
};
