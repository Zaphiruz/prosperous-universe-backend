// Schemas
import { ProductionLineTC } from '../models/productionLine';
import { OperatorTC } from '../models/operator';
import { EntityTC } from '../models/entity';
import { MaterialTC } from '../models/material';
import { CompanyTC } from '../models/company';

export const ProductionLineQuery = {
	productionLineById: ProductionLineTC.getResolver('findById'),
	productionLineByIds: ProductionLineTC.getResolver('findByIds'),
	productionLineOne: ProductionLineTC.getResolver('findOne'),
	productionLineMany: ProductionLineTC.getResolver('findMany'),
	productionLineCount: ProductionLineTC.getResolver('count'),
	productionLineConnection: ProductionLineTC.getResolver('connection'),
	productionLinePagination: ProductionLineTC.getResolver('pagination'),
};

export const ProductionLineMutation = {
	productionLineCreateOne: ProductionLineTC.getResolver('createOne'),
	productionLineCreateMany: ProductionLineTC.getResolver('createMany'),
	productionLineUpdateById: ProductionLineTC.getResolver('updateById'),
	productionLineUpdateOne: ProductionLineTC.getResolver('updateOne'),
	productionLineUpdateMany: ProductionLineTC.getResolver('updateMany'),
	productionLineRemoveById: ProductionLineTC.getResolver('removeById'),
	productionLineRemoveOne: ProductionLineTC.getResolver('removeOne'),
	productionLineRemoveMany: ProductionLineTC.getResolver('removeMany'),
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
	.getFieldOTC('inputs')
	.addRelation('material', {
		resolver: MaterialTC.getResolver('findById'),
		prepareArgs: {
			_id: source => source.material
		},
		projection: { material: true }
	});

ProductionLineTC
	.getFieldOTC('orders')
	.getFieldOTC('outputs')
	.addRelation('material', {
		resolver: MaterialTC.getResolver('findById'),
		prepareArgs: {
			_id: source => source.material
		},
		projection: { material: true }
	});

ProductionLineTC
	.getFieldOTC('orders')
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