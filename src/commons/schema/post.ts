import { z } from "zod/mod.ts";
import type { NewPost } from "../../db/schema/post.ts";

export type NewPostData = Pick<NewPost, "title" | "content">;

export const createPostSchema = z.object({
	title: z.string(),
	content: z.string(),
});
