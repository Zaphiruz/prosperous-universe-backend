
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import graphqlSchema from './schemas/index';
import graphqlPlayground from 'graphql-playground-middleware-express';

// routes
import storages from './routes/storages';

const extentions = function({ context }) {
	return {
		runTime: Date.now() - context.startTime
	};
}

dotenv.config();

const app = express();

// post middleware
app.use(express.json());

// routes
const routes = {
	storages
};
for(let [route, router] of Object.entries(routes)) {
	app.use(`/${route}`, cors(), router);
}

app.options('/graphql', cors());
app.use('/graphql', cors() ,graphqlHTTP((request) => {
	return {
		context: { startTime: Date.now() },
		graphql: true,
		schema: graphqlSchema,
		extentions
	};
}));

app.get('/', graphqlPlayground({ endpoint: '/graphql' }));

let port = 8080;
app.listen(port, function() {
	console.log(`Listening on ${port}`);

	mongoose.connect(`mongodb+srv://${process.env.mongoAdminUsername}:${process.env.mongoAdminPassword}@pu.ms67p.mongodb.net/PUData?retryWrites=true&w=majority`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});
});

mongoose.connection.on('error', console.error.bind(undefined, "Failled to connect to DB!"))