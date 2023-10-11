import { ControllerProvider } from "../container/types.ts";
import { PostController, PostControllerToken } from "./post.controller.ts";

export const controllers: Array<ControllerProvider> = [
	{
		provide: PostControllerToken,
		useClass: PostController,
	},
];
