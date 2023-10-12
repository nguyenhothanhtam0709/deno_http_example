import { inject, injectable } from 'inversify';
import { AbstractBaseController } from './_base.controller.ts';
import {
	type DatabaseService,
	DatabaseServiceToken,
} from '../services/database.service.ts';
import { createPostSchema } from '../commons/schema/post.ts';
import { zValidator } from '@hono/zod-validator';
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { postTable } from '../db/schema/post.ts';
import { eq } from 'drizzle-orm';

export const PostControllerToken = Symbol('PostController');

@injectable()
export class PostController extends AbstractBaseController {
	private readonly db: PostgresJsDatabase;

	constructor(
		@inject(DatabaseServiceToken)
		private readonly databaseService: DatabaseService
	) {
		super({ path: '/posts' });

		this.db = this.databaseService.db;
	}

	public mapRoute(): void {
		// create posts
		this.route.post('/', zValidator('json', createPostSchema), async (c) => {
			const body = c.req.valid('json');
			await this.db.insert(postTable).values(body);

			c.status(201);
			return c.json({});
		});

		// get posts
		this.route.get('/', async (c) => {
			const posts = await this.db.select().from(postTable);

			return c.json({ posts });
		});

		// get posts/:id
		this.route.get('/:id{[0-9]+}', async (c) => {
			const id = parseInt(c.req.param().id);
			const posts = await this.db
				.select()
				.from(postTable)
				.where(eq(postTable.id, id))
				.limit(1);
			if (!posts.length) {
				return c.notFound();
			}

			return c.json({ posts: posts[0] });
		});
	}
}
