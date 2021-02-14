import { EntityTC } from '../models/entity';

export const EntityQuery = {
	entityById: EntityTC.getResolver('findById'),
	entityByIds: EntityTC.getResolver('findByIds'),
	entityOne: EntityTC.getResolver('findOne'),
	entityMany: EntityTC.getResolver('findMany'),
	entityCount: EntityTC.getResolver('count'),
	entityConnection: EntityTC.getResolver('connection'),
	entityPagination: EntityTC.getResolver('pagination'),
};

export const EntityMutation = {
	entityCreateOne: EntityTC.getResolver('createOne'),
	entityCreateMany: EntityTC.getResolver('createMany'),
	entityUpdateById: EntityTC.getResolver('updateById'),
	entityUpdateOne: EntityTC.getResolver('updateOne'),
	entityUpdateMany: EntityTC.getResolver('updateMany'),
	entityRemoveById: EntityTC.getResolver('removeById'),
	entityRemoveOne: EntityTC.getResolver('removeOne'),
	entityRemoveMany: EntityTC.getResolver('removeMany'),
};
