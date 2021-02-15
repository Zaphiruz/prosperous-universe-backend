import { Schema } from 'mongoose';
import Price from './price';

export const RepairMaterial = Schema(
	{
		amount: Number,
		material: {
			type: String,
			ref: 'Material'
		},
	}
);
export default RepairMaterial;

export const ValuableMaterial = RepairMaterial.add({
	value: Price
})