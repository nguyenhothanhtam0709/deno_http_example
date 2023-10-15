import { AbstractBaseService } from './_base.service.ts';
import { inject, injectable } from 'inversify';
import {
	type PostRepository,
	PostRepositoryToken,
} from './repositories/post.repository.ts';
import { HttpNotFoundException } from '../commons/exceptions/not_found.exception.ts';
import type { UpdatePost, NewPost } from '../db/schema/post.ts';

export const PostServiceToken = Symbol('PostService');

@injectable()
export class PostService extends AbstractBaseService {
	constructor(
		@inject(PostRepositoryToken)
		private readonly postRepo: PostRepository
	) {
		super();
	}

	public createPost(data: NewPost) {
		return this.postRepo.insert(data);
	}

	public async getPost(id: number) {
		const post = await this.postRepo.findOneById(id);
		if (post) {
			return post;
		}

		throw new HttpNotFoundException();
	}

	public getPosts() {
		return this.postRepo.select();
	}

	public async updatePost(id: number, data: UpdatePost) {
		const post = await this.postRepo.updateById(id, data);
		if (!post) {
			throw new HttpNotFoundException();
		}

		return post;
	}

	public async deletePost(id: number) {
		const result = await this.postRepo.deleteById(id);
		if (!result) {
			throw new HttpNotFoundException();
		}
	}
}
