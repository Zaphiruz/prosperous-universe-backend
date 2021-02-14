import { Schema } from 'mongoose';

export const Millis = Schema(
	{
		millis: Number
	}
)

export const Timestamp = Schema(
	{
		timestamp: Number
	}
)
export default Timestamp;