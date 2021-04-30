import { StorageShipTC } from '../models/storageShip';
import { MaterialTC } from '../models/material';
import { CompanyTC } from '../models/company';
import { ShipTC } from '../models/ship';

export const StorageShipQuery = {
	storageShipById: StorageShipTC.getResolver('findById'),
	storageShipByIds: StorageShipTC.getResolver('findByIds'),
	storageShipOne: StorageShipTC.getResolver('findOne'),
	storageShipMany: StorageShipTC.getResolver('findMany'),
	storageShipCount: StorageShipTC.getResolver('count'),
	storageShipConnection: StorageShipTC.getResolver('connection'),
	storageShipPagination: StorageShipTC.getResolver('pagination'),
};

export const StorageShipMutation = {
	storageShipCreateOne: StorageShipTC.getResolver('createOne'),
	storageShipCreateMany: StorageShipTC.getResolver('createMany'),
	storageShipUpdateById: StorageShipTC.getResolver('updateById'),
	storageShipUpdateOne: StorageShipTC.getResolver('updateOne'),
	storageShipUpdateMany: StorageShipTC.getResolver('updateMany'),
	storageShipRemoveById: StorageShipTC.getResolver('removeById'),
	storageShipRemoveOne: StorageShipTC.getResolver('removeOne'),
	storageShipRemoveMany: StorageShipTC.getResolver('removeMany'),
};

StorageShipTC
	.getFieldOTC('items')
	.getFieldOTC('quantity')
	.addRelation('material', {
		resolver: MaterialTC.getResolver('findById'),
		prepareArgs: {
			_id: source => source.material
		},
		projection: { material: true }
})

StorageShipTC.addRelation('owner', {
	resolver: CompanyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.owner
	},
	projection: { owner: true }
})

StorageShipTC.addRelation('addressableId', {
	resolver: ShipTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.addressableId
	},
	projection: { addressableId: true }
})
