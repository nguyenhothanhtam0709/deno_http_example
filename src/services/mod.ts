import { ConfigService, ConfigServiceToken } from './config.service.ts';
import { DatabaseService, DatabaseServiceToken } from './database.service.ts';

import type { Provider } from '../container/types.ts';

export const providers: Array<Provider> = [
	{
		provide: ConfigServiceToken,
		useClass: ConfigService,
	},
	{
		provide: DatabaseServiceToken,
		useClass: DatabaseService,
	},
];
