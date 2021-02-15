import { SiteTC } from '../models/site';
import { CompanyTC } from '../models/company';
import { EntityTC } from '../models/entity';
import { BuildingTC } from '../models/building';

export const SiteQuery = {
	siteById: SiteTC.getResolver('findById'),
	siteByIds: SiteTC.getResolver('findByIds'),
	siteOne: SiteTC.getResolver('findOne'),
	siteMany: SiteTC.getResolver('findMany'),
	siteCount: SiteTC.getResolver('count'),
	siteConnection: SiteTC.getResolver('connection'),
	sitePagination: SiteTC.getResolver('pagination'),
};

export const SiteMutation = {
	siteCreateOne: SiteTC.getResolver('createOne'),
	siteCreateMany: SiteTC.getResolver('createMany'),
	siteUpdateById: SiteTC.getResolver('updateById'),
	siteUpdateOne: SiteTC.getResolver('updateOne'),
	siteUpdateMany: SiteTC.getResolver('updateMany'),
	siteRemoveById: SiteTC.getResolver('removeById'),
	siteRemoveOne: SiteTC.getResolver('removeOne'),
	siteRemoveMany: SiteTC.getResolver('removeMany'),
};

SiteTC.addRelation('owner', {
	resolver: CompanyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.owner
	},
	projection: { owner: true }
});

SiteTC.addRelation('address', {
	resolver: EntityTC.getResolver('findByIds'),
	prepareArgs: {
		_ids: source => source.address
	},
	projection: { address: true }
});

SiteTC.addRelation('platforms', {
	resolver: BuildingTC.getResolver('findByIds'),
	prepareArgs: {
		_ids: source => source.platforms
	},
	projection: { platforms: true }
});
