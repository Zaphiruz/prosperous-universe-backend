import { NeedTC } from '../models/need';
import { MaterialTC } from '../models/material';

export const NeedQuery = {
	needById: NeedTC.getResolver('findById'),
	needByIds: NeedTC.getResolver('findByIds'),
	needOne: NeedTC.getResolver('findOne'),
	needMany: NeedTC.getResolver('findMany'),
	needCount: NeedTC.getResolver('count'),
	needConnection: NeedTC.getResolver('connection'),
	needPagination: NeedTC.getResolver('pagination'),
};

export const NeedMutation = {
	needCreateOne: NeedTC.getResolver('createOne'),
	needCreateMany: NeedTC.getResolver('createMany'),
	needUpdateById: NeedTC.getResolver('updateById'),
	needUpdateOne: NeedTC.getResolver('updateOne'),
	needUpdateMany: NeedTC.getResolver('updateMany'),
	needRemoveById: NeedTC.getResolver('removeById'),
	needRemoveOne: NeedTC.getResolver('removeOne'),
	needRemoveMany: NeedTC.getResolver('removeMany'),
};

NeedTC.getFieldOTC('needs').addRelation('material', {
	resolver: MaterialTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.material
	},
	projection: { material: true }
})
