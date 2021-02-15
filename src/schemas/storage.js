import { StorageTC } from '../models/storage';
import { MaterialTC } from '../models/material';
import { CompanyTC } from '../models/company';
import { SiteTC } from '../models/site';
import { ShipTC } from '../models/ship';

export const StorageQuery = {
	storageById: StorageTC.getResolver('findById'),
	storageByIds: StorageTC.getResolver('findByIds'),
	storageOne: StorageTC.getResolver('findOne'),
	storageMany: StorageTC.getResolver('findMany'),
	storageCount: StorageTC.getResolver('count'),
	storageConnection: StorageTC.getResolver('connection'),
	storagePagination: StorageTC.getResolver('pagination'),
};

export const StorageMutation = {
	storageCreateOne: StorageTC.getResolver('createOne'),
	storageCreateMany: StorageTC.getResolver('createMany'),
	storageUpdateById: StorageTC.getResolver('updateById'),
	storageUpdateOne: StorageTC.getResolver('updateOne'),
	storageUpdateMany: StorageTC.getResolver('updateMany'),
	storageRemoveById: StorageTC.getResolver('removeById'),
	storageRemoveOne: StorageTC.getResolver('removeOne'),
	storageRemoveMany: StorageTC.getResolver('removeMany'),
};

StorageTC
	.getFieldOTC('items')
	.getFieldOTC('quantity')
	.addRelation('material', {
		resolver: MaterialTC.getResolver('findById'),
		prepareArgs: {
			_id: source => source.material
		},
		projection: { material: true }
})

StorageTC.addRelation('owner', {
	resolver: CompanyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.owner
	},
	projection: { owner: true }
})

// TODO: resolve mixed type as union?
// StorageTC.addRelation('addressableId', {
// 	prepareArgs: {
// 		_id: source => source.addressableId
// 	},
// 	projection: { addressableId: true },
// 	resolve(source) {
// 		let modalTC = source.type === 'STORE' ? SiteTC : ShipTC;
// 		let resolver = modalTC.getResolver('findById');
// 		return resolver.call(this, ...arguments);
// 	}
// })

