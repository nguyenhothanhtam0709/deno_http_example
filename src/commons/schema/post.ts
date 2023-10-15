import type { NewPost } from '../../db/schema/post.ts';
import { z } from 'zod';

export type NewPostData = Pick<NewPost, 'title' | 'content'>;

export const createPostSchema = z.object({
	title: z.string().max(256),
	content: z.string().nullable(),
});

export const updatePostSchema = z.object({
	title: z.string().max(256).nullable(),
	content: z.string().nullable(),
});
