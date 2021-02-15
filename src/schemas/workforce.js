import { WorkforceTC } from '../models/workforce';
import { NeedTC } from '../models/need';
import { CompanyTC } from '../models/company';
import { SiteTC } from '../models/site';
import { EntityTC } from '../models/entity';

export const WorkforceQuery = {
	workforceById: WorkforceTC.getResolver('findById'),
	workforceByIds: WorkforceTC.getResolver('findByIds'),
	workforceOne: WorkforceTC.getResolver('findOne'),
	workforceMany: WorkforceTC.getResolver('findMany'),
	workforceCount: WorkforceTC.getResolver('count'),
	workforceConnection: WorkforceTC.getResolver('connection'),
	workforcePagination: WorkforceTC.getResolver('pagination'),
};

export const WorkforceMutation = {
	workforceCreateOne: WorkforceTC.getResolver('createOne'),
	workforceCreateMany: WorkforceTC.getResolver('createMany'),
	workforceUpdateById: WorkforceTC.getResolver('updateById'),
	workforceUpdateOne: WorkforceTC.getResolver('updateOne'),
	workforceUpdateMany: WorkforceTC.getResolver('updateMany'),
	workforceRemoveById: WorkforceTC.getResolver('removeById'),
	workforceRemoveOne: WorkforceTC.getResolver('removeOne'),
	workforceRemoveMany: WorkforceTC.getResolver('removeMany'),
};

WorkforceTC.getFieldOTC('workforces').addRelation('needs', {
	resolver: NeedTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.needs
	},
	projection: { needs: true }
})

WorkforceTC.addRelation('owner', {
	WorkforceTC: CompanyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.owner
	},
	projection: { owner: true }
})


WorkforceTC.addRelation('siteId', {
	resolver: SiteTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.siteId
	},
	projection: { siteId: true }
});


WorkforceTC.addRelation('address', {
	resolver: EntityTC.getResolver('findByIds'),
	prepareArgs: {
		_ids: source => source.address
	},
	projection: { address: true }
});
