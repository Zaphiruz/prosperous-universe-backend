// Schemas
import { ProductionLineTC } from '../models/productionLine';
import { OperatorTC } from '../models/operator';
import { EntityTC } from '../models/entity';
import { MaterialTC } from '../models/material';
import { CompanyTC } from '../models/company';

export const ProductionLineQuery = {
	orderById: ProductionLineTC.getResolver('findById'),
	orderByIds: ProductionLineTC.getResolver('findByIds'),
	orderOne: ProductionLineTC.getResolver('findOne'),
	orderMany: ProductionLineTC.getResolver('findMany'),
	orderCount: ProductionLineTC.getResolver('count'),
	orderConnection: ProductionLineTC.getResolver('connection'),
	orderPagination: ProductionLineTC.getResolver('pagination'),
};

export const ProductionLineMutation = {
	orderCreateOne: ProductionLineTC.getResolver('createOne'),
	orderCreateMany: ProductionLineTC.getResolver('createMany'),
	orderUpdateById: ProductionLineTC.getResolver('updateById'),
	orderUpdateOne: ProductionLineTC.getResolver('updateOne'),
	orderUpdateMany: ProductionLineTC.getResolver('updateMany'),
	orderRemoveById: ProductionLineTC.getResolver('removeById'),
	orderRemoveOne: ProductionLineTC.getResolver('removeOne'),
	orderRemoveMany: ProductionLineTC.getResolver('removeMany'),
};

ProductionLineTC.addRelation('address', {
	resolver: EntityTC.getResolver('findById'),
	prepareArgs: {
		_ids: source => source.address
	},
	projection: {address: true }
});

ProductionLineTC
	.getFieldOTC('orders')
	.getFieldOTC('productionFeeCollector')
	.addRelation('productionFeeCollector', {
		resolver: OperatorTC.getResolver('findById'),
		prepareArgs: {
			_id: source => source.productionFeeCollector
		},
		projection: { productionFeeCollector: true }
	});

ProductionLineTC
	.getFieldOTC('productionTemplates')
	.getFieldOTC('inputFactors')
	.addRelation('material', {
		resolver: MaterialTC.getResolver('findById'),
		prepareArgs: {
			_id: source => source.material
		},
		projection: { material: true }
	});

ProductionLineTC
	.getFieldOTC('productionTemplates')
	.getFieldOTC('outputFactors')
	.addRelation('material', {
		resolver: MaterialTC.getResolver('findById'),
		prepareArgs: {
			_id: source => source.material
		},
		projection: { material: true }
	});

ProductionLineTC
	.getFieldOTC('productionTemplates')
	.addRelation('productionFeeCollector', {
		resolver: OperatorTC.getResolver('findById'),
		prepareArgs: {
			_id: source => source.productionFeeCollector
		},
		projection: { material: true }
	});