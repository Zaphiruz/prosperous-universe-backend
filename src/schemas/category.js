import { CategoryTC } from '../models/category';
import { MaterialTC } from '../models/material';

export const CategoryQuery = {
	categoryById: CategoryTC.getResolver('findById'),
	categoryByIds: CategoryTC.getResolver('findByIds'),
	categoryOne: CategoryTC.getResolver('findOne'),
	categoryMany: CategoryTC.getResolver('findMany'),
	categoryCount: CategoryTC.getResolver('count'),
	categoryConnection: CategoryTC.getResolver('connection'),
	categoryPagination: CategoryTC.getResolver('pagination'),
};

export const CategoryMutation = {
	categoryCreateOne: CategoryTC.getResolver('createOne'),
	categoryCreateMany: CategoryTC.getResolver('createMany'),
	categoryUpdateById: CategoryTC.getResolver('updateById'),
	categoryUpdateOne: CategoryTC.getResolver('updateOne'),
	categoryUpdateMany: CategoryTC.getResolver('updateMany'),
	categoryRemoveById: CategoryTC.getResolver('removeById'),
	categoryRemoveOne: CategoryTC.getResolver('removeOne'),
	categoryRemoveMany: CategoryTC.getResolver('removeMany'),
};

	CategoryTC.addRelation('materials', {
		resolver: MaterialTC.getResolver('findByIds'),
		prepareArgs: {
			_ids: source => source.materials
		},
		projection: { materials: true }
	})
