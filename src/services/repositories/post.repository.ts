import { postTable } from '../../db/schema/post.ts';
import {
	type DatabaseService,
	DatabaseServiceToken,
} from '../database.service.ts';
import { BaseRepository } from './_base.repository.ts';
import { inject, injectable } from 'inversify';

export const PostRepositoryToken = Symbol('PostRepository');

@injectable()
export class PostRepository extends BaseRepository<
	typeof postTable._.config,
	typeof postTable
> {
	constructor(
		@inject(DatabaseServiceToken)
		protected readonly databaseService: DatabaseService
	) {
		super(databaseService, postTable);
	}
}
