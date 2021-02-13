import { Schema } from 'mongoose';
import Price from './price';

export default Schema(
	{
		amount: Number,
		price: Price,
	}
);