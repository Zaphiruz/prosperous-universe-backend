
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import http from 'http';
import https from 'https';
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

let httpServer = http.createServer(app);
httpServer.listen(80, (err) => {
	if (err) return console.error(err);
	console.log('listening on 80');
})

if (process.env.NODE_ENV === 'production') {
	const key = fs.readFileSync('/etc/letsencrypt/live/prosperon.app/privkey.pem', 'utf-8');
	const cert = fs.readFileSync('/etc/letsencrypt/live/prosperon.app/cert.pem', 'utf-8');
	const ca = fs.readFileSync('/etc/letsencrypt/live/prosperon.app/chain.pem', 'utf-8');

	let httpServer = https.createServer({key, cert, ca}, app);
	httpServer.listen(443, (err) => {
		if (err) return console.error(err);
		console.log('listening on 443');
	})
}


mongoose.connection.on('error', console.error.bind(undefined, "Failled to connect to DB!"))