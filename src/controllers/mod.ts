import { PostController, PostControllerToken } from './post.controller.ts';

import type { ControllerProvider } from '../container/types.ts';

export const controllers: Array<ControllerProvider> = [
	{
		provide: PostControllerToken,
		useClass: PostController,
	},
];
