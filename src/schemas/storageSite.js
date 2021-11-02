import { StorageSiteTC } from '../models/storageSite';
import { MaterialTC } from '../models/material';
import { CompanyTC } from '../models/company';
import { SiteTC } from '../models/site';

export const StorageSiteQuery = {
	storageSiteById: StorageSiteTC.getResolver('findById'),
	storageSiteByIds: StorageSiteTC.getResolver('findByIds'),
	storageSiteOne: StorageSiteTC.getResolver('findOne'),
	storageSiteMany: StorageSiteTC.getResolver('findMany'),
	storageSiteCount: StorageSiteTC.getResolver('count'),
	storageSiteConnection: StorageSiteTC.getResolver('connection'),
	storageSitePagination: StorageSiteTC.getResolver('pagination'),
};

export const StorageSiteMutation = {
	storageSiteCreateOne: StorageSiteTC.getResolver('createOne'),
	storageSiteCreateMany: StorageSiteTC.getResolver('createMany'),
	storageSiteUpdateById: StorageSiteTC.getResolver('updateById'),
	storageSiteUpdateOne: StorageSiteTC.getResolver('updateOne'),
	storageSiteUpdateMany: StorageSiteTC.getResolver('updateMany'),
	storageSiteRemoveById: StorageSiteTC.getResolver('removeById'),
	storageSiteRemoveOne: StorageSiteTC.getResolver('removeOne'),
	storageSiteRemoveMany: StorageSiteTC.getResolver('removeMany'),
};

StorageSiteTC
	.getFieldOTC('items')
	.getFieldOTC('quantity')
	.addRelation('material', {
		resolver: MaterialTC.getResolver('findById'),
		prepareArgs: {
			_id: source => source.material
		},
		projection: { material: true }
})

StorageSiteTC.addRelation('owner', {
	resolver: CompanyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.owner
	},
	projection: { owner: true }
})

StorageSiteTC.addRelation('addressableId', {
	resolver: SiteTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.addressableId
	},
	projection: { addressableId: true }
})
