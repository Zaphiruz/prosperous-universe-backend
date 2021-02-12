import { SchemaComposer } from 'graphql-compose';

import { MaterialQuery, MaterialMutation } from './material';
import { CategoryQuery, CategoryMutation } from './category';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
	...MaterialQuery,
	...CategoryQuery,
});

schemaComposer.Mutation.addFields({
	...MaterialMutation,
	...CategoryMutation,
});

export default schemaComposer.buildSchema();
