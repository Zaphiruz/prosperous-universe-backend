import { BuildingOptionTC } from '../models/buildingOption';
import { MaterialTC } from '../models/material';
 
export const BuildingOptionQuery = {
	buildingOptionById: BuildingOptionTC.getResolver('findById'),
	buildingOptionByIds: BuildingOptionTC.getResolver('findByIds'),
	buildingOptionOne: BuildingOptionTC.getResolver('findOne'),
	buildingOptionMany: BuildingOptionTC.getResolver('findMany'),
	buildingOptionCount: BuildingOptionTC.getResolver('count'),
	buildingOptionConnection: BuildingOptionTC.getResolver('connection'),
	buildingOptionPagination: BuildingOptionTC.getResolver('pagination'),
};

export const BuildingOptionMutation = {
	buildingOptionCreateOne: BuildingOptionTC.getResolver('createOne'),
	buildingOptionCreateMany: BuildingOptionTC.getResolver('createMany'),
	buildingOptionUpdateById: BuildingOptionTC.getResolver('updateById'),
	buildingOptionUpdateOne: BuildingOptionTC.getResolver('updateOne'),
	buildingOptionUpdateMany: BuildingOptionTC.getResolver('updateMany'),
	buildingOptionRemoveById: BuildingOptionTC.getResolver('removeById'),
	buildingOptionRemoveOne: BuildingOptionTC.getResolver('removeOne'),
	buildingOptionRemoveMany: BuildingOptionTC.getResolver('removeMany'),
};

BuildingOptionTC.getFieldOTC('materials').addRelation('material', {
	resolver: MaterialTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.material
	},
	projection: { material: true }
})