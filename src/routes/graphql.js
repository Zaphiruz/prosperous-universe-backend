import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import graphqlSchema from '../schemas/index';

const extentions = function({ context }) {
	return {
		runTime: Date.now() - context.startTime
	};
}

const router = express.Router();

router.use('/', graphqlHTTP(() => {
	return {
		context: { startTime: Date.now() },
		graphql: true,
		schema: graphqlSchema,
		extentions
	};
}));

export default router;