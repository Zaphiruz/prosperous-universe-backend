import { ShipTC } from '../models/ship';
import { MaterialTC } from '../models/material';
 
export const ShipQuery = {
	shipById: ShipTC.getResolver('findById'),
	shipByIds: ShipTC.getResolver('findByIds'),
	shipOne: ShipTC.getResolver('findOne'),
	shipMany: ShipTC.getResolver('findMany'),
	shipCount: ShipTC.getResolver('count'),
	shipConnection: ShipTC.getResolver('connection'),
	shipPagination: ShipTC.getResolver('pagination'),
};

export const ShipMutation = {
	shipCreateOne: ShipTC.getResolver('createOne'),
	shipCreateMany: ShipTC.getResolver('createMany'),
	shipUpdateById: ShipTC.getResolver('updateById'),
	shipUpdateOne: ShipTC.getResolver('updateOne'),
	shipUpdateMany: ShipTC.getResolver('updateMany'),
	shipRemoveById: ShipTC.getResolver('removeById'),
	shipRemoveOne: ShipTC.getResolver('removeOne'),
	shipRemoveMany: ShipTC.getResolver('removeMany'),
};

ShipTC.getFieldOTC('repairMaterials').addRelation('material', {
	resolver: MaterialTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.material
	},
	projection: { material: true }
})