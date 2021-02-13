import { Schema } from 'mongoose';
import PriceSchema from './price';

export default Schema(
	{
		amount: Number,
		price: PriceSchema,
	}
);