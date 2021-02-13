import { SchemaComposer } from 'graphql-compose';

import { MaterialQuery, MaterialMutation } from './material';
import { CategoryQuery, CategoryMutation } from './category';
import { CurrencyQuery, CurrencyMutation } from './currency';
import { OperatorQuery, OperatorMutation } from './operator';
import { ExchangeQuery, ExchangeMutation } from './exchange';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
	...MaterialQuery,
	...CategoryQuery,
	...CurrencyQuery,
	...OperatorQuery,
	...ExchangeQuery,
});

schemaComposer.Mutation.addFields({
	...MaterialMutation,
	...CategoryMutation,
	...CurrencyMutation,
	...OperatorMutation,
	...ExchangeMutation,
});

export default schemaComposer.buildSchema();
