import { PlanetTC } from '../models/planet';
import { MaterialTC } from '../models/material';
import { EntityTC } from '../models/entity';
import { StarTC } from '../models/star';

export const PlanetQuery = {
	planetById: PlanetTC.getResolver('findById'),
	planetByIds: PlanetTC.getResolver('findByIds'),
	planetOne: PlanetTC.getResolver('findOne'),
	planetMany: PlanetTC.getResolver('findMany')
		.addFilterArg({
			name: 'materials',
			type: '[String]',
			description: 'Search by materials',
			query: (planetQuery, materials) => {
				planetQuery['data.resources.material'] = { $in: materials }
			}
		})
		//.addFilterArg({
		//	name: 'lessThanFertility',
		//	type: '[String]',
		//	description: 'Search by materials',
		//	query: (planetQuery, materials) => {
		//		planetQuery['data.resources.material'] = { $in: materials }
		//	}
		//})
		.addSortArg({
			name: "sortOrder",
			description: "1 for assending, -1 for decending",
			value: { data: { resources: { factor: -1 } } },
        }),
	planetCount: PlanetTC.getResolver('count'),
	planetConnection: PlanetTC.getResolver('connection'),
	planetPagination: PlanetTC.getResolver('pagination')
		//.addFilterArg({		// TODO Figure out if this can work. At present, it can't? Can't filter based on child properties? May be wrong here
		//	name: 'toMoria',
		//	type: '[Int]',
		//	description: 'Distance to Moria',
		//	query: (planetQuery, toMoria) => {
		//		planetQuery['systemId.distances.toMoria'] = { $in: toMoria }	//MongoDB -> $in, $other$words
  //          }
  //      })
		.addFilterArg({
			name: 'materials',
			type: '[String]',
			description: 'Search by materials',
			query: (planetQuery, materials) => {
				planetQuery['data.resources.material'] = { $in: materials }
			}
		})
		//.addSortArg({
		//	name: '_MORIA_ASC',
		//	value: {"systemId.distances.toMoria": 'ASC'}
		//})
		.addSortArg({
			name: '_NAME_ASC',
			value: {name: 'ASC'}
        }),
};

export const PlanetMutation = {
	planetCreateOne: PlanetTC.getResolver('createOne'),
	planetCreateMany: PlanetTC.getResolver('createMany'),
	planetUpdateById: PlanetTC.getResolver('updateById'),
	planetUpdateOne: PlanetTC.getResolver('updateOne'),
	planetUpdateMany: PlanetTC.getResolver('updateMany'),
	planetRemoveById: PlanetTC.getResolver('removeById'),
	planetRemoveOne: PlanetTC.getResolver('removeOne'),
	planetRemoveMany: PlanetTC.getResolver('removeMany'),
};

PlanetTC
	.getFieldOTC('data')
	.getFieldOTC('resources')
	.addRelation('material', {
	resolver: MaterialTC.getResolver('findById'),
	prepareArgs: {
		_id: source => source.material
	},
	projection: { material: true }
});

PlanetTC
	.getFieldOTC('address')
	.addRelation('lines', {
		resolver: EntityTC.getResolver('findById'),
		prepareArgs: {
			_id: source => source.lines
		},
		projection: { lines: [] }
	});

PlanetTC
	.addRelation('systemId', {
		resolver: StarTC.getResolver('findById'),
		prepareArgs: {
			_id: source => source.systemId
		},
		projection: { systemId: true }
	});