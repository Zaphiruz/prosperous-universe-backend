import { MaterialTC } from '../models/material';
import { CategoryTC } from '../models/category';

export const MaterialQuery = {
	materialById: MaterialTC.getResolver('findById'),
	materialByIds: MaterialTC.getResolver('findByIds'),
	materialOne: MaterialTC.getResolver('findOne'),
	materialMany: MaterialTC.getResolver('findMany'),
	materialCount: MaterialTC.getResolver('count'),
	materialConnection: MaterialTC.getResolver('connection'),
	materialPagination: MaterialTC.getResolver('pagination'),
};

export const MaterialMutation = {
	materialCreateOne: MaterialTC.getResolver('createOne'),
	materialCreateMany: MaterialTC.getResolver('createMany'),
	materialUpdateById: MaterialTC.getResolver('updateById'),
	materialUpdateOne: MaterialTC.getResolver('updateOne'),
	materialUpdateMany: MaterialTC.getResolver('updateMany'),
	materialRemoveById: MaterialTC.getResolver('removeById'),
	materialRemoveOne: MaterialTC.getResolver('removeOne'),
	materialRemoveMany: MaterialTC.getResolver('removeMany'),
};

MaterialTC.addRelation('category', {
	resolver: CategoryTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.category
	},
	projection: { category: true }
})