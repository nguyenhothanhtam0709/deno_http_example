import { ConfigService, ConfigServiceToken } from './config.service.ts';
import { DatabaseService, DatabaseServiceToken } from './database.service.ts';
import {
	PostRepository,
	PostRepositoryToken,
} from './repositories/post.repository.ts';
import { PostService, PostServiceToken } from './post.service.ts';

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
	{
		provide: PostServiceToken,
		useClass: PostService,
	},
	{
		provide: PostRepositoryToken,
		useClass: PostRepository,
	},
];
