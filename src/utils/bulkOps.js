export const hasId = (data => !!data._id);

export const write = Model => data => {
	let bulkOps = data
		.filter(hasId)
		.map(data => new Model(data))
		.map(record => ({
			updateOne: {
				filter: { _id: record._id },
				update: record,
				upsert: true
			}
		}))
	
	return Model.collection.bulkWrite(bulkOps);
}
