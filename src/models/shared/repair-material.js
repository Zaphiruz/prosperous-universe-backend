import { Schema } from 'mongoose';

export default Schema(
	{
		amount: Number,
		material: {
			type: String,
			ref: 'Material'
		},
	}
);
