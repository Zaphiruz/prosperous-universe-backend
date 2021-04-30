import { StarTC } from '../models/star';
import { EntityTC } from '../models/entity';

export const StarQuery = {
	starById: StarTC.getResolver('findById'),
	starByIds: StarTC.getResolver('findByIds'),
	starOne: StarTC.getResolver('findOne'),
	starMany: StarTC.getResolver('findMany'),
	starCount: StarTC.getResolver('count'),
	starConnection: StarTC.getResolver('connection'),
	starPagination: StarTC.getResolver('pagination'),
};

export const StarMutation = {
	starCreateOne: StarTC.getResolver('createOne'),
	starCreateMany: StarTC.getResolver('createMany'),
	starUpdateById: StarTC.getResolver('updateById'),
	starUpdateOne: StarTC.getResolver('updateOne'),
	starUpdateMany: StarTC.getResolver('updateMany'),
	starRemoveById: StarTC.getResolver('removeById'),
	starRemoveOne: StarTC.getResolver('removeOne'),
	starRemoveMany: StarTC.getResolver('removeMany'),
};

StarTC
	.getFieldOTC('address')
	.addRelation('lines', {
		resolver: EntityTC.getResolver('findById'),
		prepareArgs: {
			_id: source => source.entity
		},
		projection: { lines: [] }
	})

