require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(bodyParser.json());


// routes
let routes = {
	'/materials': require('./routes/materials.js')
}
for(let [route, router] of Object.entries(routes)) {
	app.use(route, router);
}

app.get('/', (req, res) => {
	res.send('HOME');
});

mongoose.connect(`mongodb+srv://${process.env.mongoAdminUsername}:${process.env.mongoAdminPassword}@pu.ms67p.mongodb.net/PUData?retryWrites=true&w=majority`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, function(error) {
	if (error) {
		console.log('Failled to connect to DB!', error);
		return
	}
	console.log('Connected to DB!');
});

app.listen(8080, function() {
	console.log(`Listening on 8080`);
});