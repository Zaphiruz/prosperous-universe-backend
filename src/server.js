
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import graphqlSchema from './schemas/index';
import graphqlPlayground from 'graphql-playground-middleware-express';
const extentions = function({ context }) {
	return {
		runTime: Date.now() - context.startTime
	};
}

dotenv.config();

const app = express();
app.use(cors()); // restrict later

app.use('/graphql', graphqlHTTP((request) => {
	return {
		context: { startTime: Date.now() },
		graphql: true,
		schema: graphqlSchema,
		extentions
	};
}));

app.get('/playground', graphqlPlayground({ endpoint: '/graphql' }));

let port = process.env.PORT || 80;
app.listen(port, function() {
	console.log(`Listening on ${port}`);

	mongoose.connect(`mongodb+srv://${process.env.mongoAdminUsername}:${process.env.mongoAdminPassword}@pu.ms67p.mongodb.net/PUData?retryWrites=true&w=majority`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});
});

mongoose.connection.on('error', console.error.bind(undefined, "Failled to connect to DB!"))