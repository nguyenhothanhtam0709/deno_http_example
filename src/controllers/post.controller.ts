import { inject, injectable } from 'inversify';
import { AbstractBaseController } from './_base.controller.ts';
import {
	type DatabaseService,
	DatabaseServiceToken,
} from '../services/database.service.ts';

export const PostControllerToken = Symbol('PostController');

@injectable()
export class PostController extends AbstractBaseController {
	constructor(
		@inject(DatabaseServiceToken)
		private readonly databaseService: DatabaseService
	) {
		super({ path: '/posts' });
	}

	public mapRoute(): void {
		this.route.get('/', (c) => c.text('Hello Posts!'));
	}
}
