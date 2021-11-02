import { CorpOrderTC } from '../models/corpOrder';
import { CompanyTC } from '../models/company';
import { MaterialTC } from '../models/material';

export const CorpOrderQuery = {
	corpOrderById: CorpOrderTC.getResolver('findById'),
	corpOrderByIds: CorpOrderTC.getResolver('findByIds'),
	corpOrderOne: CorpOrderTC.getResolver('findOne'),
	corpOrderMany: CorpOrderTC.getResolver('findMany'),
	corpOrderCount: CorpOrderTC.getResolver('count'),
	corpOrderConnection: CorpOrderTC.getResolver('connection'),
	corpOrderPagination: CorpOrderTC.getResolver('pagination'),
};

export const CorpOrderMutation = {
	corpOrderCreateOne: CorpOrderTC.getResolver('createOne'),
	corpOrderCreateMany: CorpOrderTC.getResolver('createMany'),
	corpOrderUpdateById: CorpOrderTC.getResolver('updateById'),
	corpOrderUpdateOne: CorpOrderTC.getResolver('updateOne'),
	corpOrderUpdateMany: CorpOrderTC.getResolver('updateMany'),
	corpOrderRemoveById: CorpOrderTC.getResolver('removeById'),
	corpOrderRemoveOne: CorpOrderTC.getResolver('removeOne'),
	corpOrderRemoveMany: CorpOrderTC.getResolver('removeMany'),
};

CorpOrderTC.addRelation('requestee', {
	resolver: CompanyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.requestee
	},
	projection: { requestee: true }
});

CorpOrderTC.addRelation('fullfiller', {
	resolver: CompanyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.fullfiller
	},
	projection: { fullfiller: true }
});

CorpOrderTC
	.getFieldOTC('order')
	.addRelation('material', {
		resolver: MaterialTC.getResolver('findById'),
		prepareArgs: {
			_id: source => source.material
		},
		projection: { material: true }
})