module.exports = (app) => {
	app.get('/:collecton/:id', (req, res) => {
		fetchOne(req.params.collecton, req.params.id).then(data => {
			res.json(data);
		});
	})
	app.get('/:collecton', (req, res) => {
		fetchAll(req.params.collecton).then(data => {
			res.json(data);
		});
	})
}

async function fetchAll(collection) {
	return [
		{
			id: 1,
			name: 'cheeseman'
		},
		{
			id: 2,
			name: 'jonny'
		}
	];
}

async function fetchOne(collection, id) {
	return {
		id: 1,
		name: 'cheeseman'
	};
}