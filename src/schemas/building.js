import { BuildingTC } from '../models/building';
import { MaterialTC } from '../models/material';
import { CompanyTC } from '../models/company';
 
export const BuildingQuery = {
	buildingById: BuildingTC.getResolver('findById'),
	buildingByIds: BuildingTC.getResolver('findByIds'),
	buildingOne: BuildingTC.getResolver('findOne'),
	buildingMany: BuildingTC.getResolver('findMany'),
	buildingCount: BuildingTC.getResolver('count'),
	buildingConnection: BuildingTC.getResolver('connection'),
	buildingPagination: BuildingTC.getResolver('pagination'),
};

export const BuildingMutation = {
	buildingCreateOne: BuildingTC.getResolver('createOne'),
	buildingCreateMany: BuildingTC.getResolver('createMany'),
	buildingUpdateById: BuildingTC.getResolver('updateById'),
	buildingUpdateOne: BuildingTC.getResolver('updateOne'),
	buildingUpdateMany: BuildingTC.getResolver('updateMany'),
	buildingRemoveById: BuildingTC.getResolver('removeById'),
	buildingRemoveOne: BuildingTC.getResolver('removeOne'),
	buildingRemoveMany: BuildingTC.getResolver('removeMany'),
};

BuildingTC.getFieldOTC('repairMaterials').addRelation('material', {
	resolver: MaterialTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.material
	},
	projection: { material: true }
})

BuildingTC.getFieldOTC('reclaimableMaterials').addRelation('material', {
	resolver: MaterialTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.material
	},
	projection: { material: true }
})

BuildingTC.addRelation('owner', {
	resolver: CompanyTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.owner
	},
	projection: { owner: true }
})