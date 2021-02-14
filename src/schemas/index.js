import { SchemaComposer } from 'graphql-compose';

import { MaterialQuery, MaterialMutation } from './material';
import { CategoryQuery, CategoryMutation } from './category';
import { CurrencyQuery, CurrencyMutation } from './currency';
import { OperatorQuery, OperatorMutation } from './operator';
import { ExchangeQuery, ExchangeMutation } from './exchange';
import { CxBrokerQuery, CxBrokerMutation } from './cxBroker';
import { OrderQuery, OrderMutation } from './order';
import { FxBrokerQuery, FxBrokerMutation } from './fxBroker';
import { ShipQuery, ShipMutation } from './ship';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
	...MaterialQuery,
	...CategoryQuery,
	...CurrencyQuery,
	...OperatorQuery,
	...ExchangeQuery,
	...CxBrokerQuery,
	...OrderQuery,
	...FxBrokerQuery,
	...ShipQuery,
});

schemaComposer.Mutation.addFields({
	...MaterialMutation,
	...CategoryMutation,
	...CurrencyMutation,
	...OperatorMutation,
	...ExchangeMutation,
	...CxBrokerMutation,
	...OrderMutation,
	...FxBrokerMutation,
	...ShipMutation,
});

export default schemaComposer.buildSchema();
