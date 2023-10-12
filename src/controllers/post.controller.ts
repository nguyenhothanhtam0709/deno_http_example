import { inject, injectable } from "inversify";
import { AbstractBaseController } from "./_base.controller.ts";
import {
	type DatabaseService,
	DatabaseServiceToken,
} from "../services/database.service.ts";
import { Context, validator } from "hono/mod.ts";
import { createPostSchema } from "../commons/schema/post.ts";

export const PostControllerToken = Symbol("PostController");

@injectable()
export class PostController extends AbstractBaseController {
	constructor(
		@inject(DatabaseServiceToken)
		private readonly databaseService: DatabaseService
	) {
		super({ path: "/posts" });
	}

	public mapRoute(): void {
		this.route.post(
			"/",
			validator("json", async (value, c) => {
				const parsed = await createPostSchema.safeParseAsync(value);
				if (!parsed.success) {
					return c.json({}, 404);
				}

				return parsed.data;
			}),
			(c) => {
				const body = c.req.valid("json");
				return c.json({ body });
			}
			// this.create.bind(this)
		);
	}

	// private async create(c: Context): Promise<Response> {
	// 	const body = c.req.valid("form");
	// 	return c.json({
	// 		message: "created",
	// 	});
	// }
}
