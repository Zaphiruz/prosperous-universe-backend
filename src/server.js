
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import graphqlPlayground from 'graphql-playground-middleware-express';

// routes
import graphql from './routes/graphql';
import storages from './routes/storages';
import companies from './routes/companies';
import workforce from './routes/workforces';
import production from './routes/production';
import fxBrokers from './routes/fxBrokers';
import sites from './routes/sites';

dotenv.config();

const app = express();

// post middleware
app.use(express.json());

// routes
const routes = {
	graphql,
	storages,
	companies,
	workforce,
	production,
	workforce,
	fxBrokers,
	sites,
};
for(let [route, router] of Object.entries(routes)) {
	app.use(`/${route}`, cors(), router);
}

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