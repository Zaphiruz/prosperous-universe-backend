import Price from './price';

export const RepairMaterial = {
	amount: Number,
	material: {
		type: String,
		ref: 'Material'
	},
}

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

export const ItemDetails = {
	id: String,
	quantity: ValuableMaterial,
	type: { type: String },
	volume: Number,
	weight: Number,
}

export function normalizeItemDetails(obj) {
	return {
		...obj,
		quantity: normalizeMaterial(obj.quantity)
	};
}

export default RepairMaterial;