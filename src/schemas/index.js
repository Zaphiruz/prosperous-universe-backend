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
import { CountryQuery, CountryMutation } from './country';
import { CurrencyAccountQuery, CurrencyAccountMutation } from './currencyAccount';
import { EntityQuery, EntityMutation } from './entity';
import { CompanyQuery, CompanyMutation } from './company';
import { BuildingQuery, BuildingMutation } from './building';
import { SiteQuery, SiteMutation } from './site';
import { StorageSiteQuery, StorageSiteMutation } from './storageSite';
import { StorageShipQuery, StorageShipMutation } from './storageShip';
import { NeedQuery, NeedMutation } from './need';
import { WorkforceQuery, WorkforceMutation } from './workforce';
import { BuildingOptionQuery, BuildingOptionMutation } from './buildingOption';
import { PlanetQuery, PlanetMutation } from './planet';
import { StarQuery, StarMutation } from './star';
import { ProductionLineQuery, ProductionLineMutation } from './productionLine';

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
	...CountryQuery,
	...CurrencyAccountQuery,
	...EntityQuery,
	...CompanyQuery,
	...BuildingQuery,
	...SiteQuery,
	...StorageSiteQuery,
	...StorageShipQuery,
	...NeedQuery,
	...WorkforceQuery,
	...BuildingOptionQuery,
	...PlanetQuery,
	...StarQuery,
	...ProductionLineQuery,
});

// schemaComposer.Mutation.addFields({
// 	...MaterialMutation,
// 	...CategoryMutation,
// 	...CurrencyMutation,
// 	...OperatorMutation,
// 	...ExchangeMutation,
// 	...CxBrokerMutation,
// 	...OrderMutation,
// 	...FxBrokerMutation,
// 	...ShipMutation,
// 	...CountryMutation,
// 	...CurrencyAccountMutation,
// 	...EntityMutation,
// 	...CompanyMutation,
// 	...BuildingMutation,
// 	...SiteMutation,
// 	...StorageSiteMutation,
// 	...StorageShipMutation,
// 	...NeedMutation,
// 	...WorkforceMutation,
// 	...BuildingOptionMutation,
//  ...PlanetMutation,
//  ...StarMutation,
//  ...ProductionLineMutation,
// });

export default schemaComposer.buildSchema();
