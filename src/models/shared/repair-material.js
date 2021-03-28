import Price from './price';

export const RepairMaterial = {
	amount: Number,
	material: {
		type: String,
		ref: 'Material'
	},
}

export default RepairMaterial;

export const ValuableMaterial = {
	...RepairMaterial,
	value: Price
}

export function normalizeMaterial(obj) {
	return {
		...obj,
		material: obj.material.id
	}
}