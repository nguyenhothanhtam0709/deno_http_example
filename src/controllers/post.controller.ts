import { inject, injectable } from 'inversify';
import { AbstractBaseController } from './_base.controller.ts';
import { createPostSchema, updatePostSchema } from '../commons/schema/post.ts';
import { zValidator } from '@hono/zod-validator';
import {
	type PostService,
	PostServiceToken,
} from '../services/post.service.ts';

export const PostControllerToken = Symbol('PostController');

@injectable()
export class PostController extends AbstractBaseController {
	constructor(
		@inject(PostServiceToken)
		private readonly postService: PostService
	) {
		super({ path: '/posts' });
	}

	public mapRoute(): void {
		// create posts
		this.route.post('/', zValidator('json', createPostSchema), async (c) => {
			const body = c.req.valid('json');
			const result = await this.postService.createPost(body);

			c.status(201);
			return c.json({ result });
		});

		// get posts
		this.route.get('/', async (c) => {
			const posts = await this.postService.getPosts();
			return c.json({ posts });
		});

		// get posts/:id
		this.route.get('/:id{[0-9]+}', async (c) => {
			const id = parseInt(c.req.param().id);
			const post = await this.postService.getPost(id);
			return c.json({ post });
		});

		// put posts/:id
		this.route.put(
			'/:id{[0-9]+}',
			zValidator('json', updatePostSchema),
			async (c) => {
				const id = parseInt(c.req.param().id);
				const body = c.req.valid('json');
				// deno-lint-ignore no-explicit-any
				const post = await this.postService.updatePost(id, body as any);
				return c.json({ post });
			}
		);

		// delete posts/:id
		this.route.delete('/:id{[0-9]+}', async (c) => {
			const id = parseInt(c.req.param().id);
			await this.postService.deletePost(id);
			return c.json({});
		});
	}
}
