const express = require('express');
const crudMiddleware = require('./CRUD/crud-middleware.js');

const app = express();

app.get('/', (req, res) => {
	res.send('HOME');
})

crudMiddleware(app);

app.listen(8080, function() {
	console.log(`Listening on 8080`);
});