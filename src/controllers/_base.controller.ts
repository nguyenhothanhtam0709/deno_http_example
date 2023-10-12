import { Hono } from 'hono';
import { injectable } from 'inversify';

type AbstractBaseControllerParams = {
	path: string;
};

@injectable()
export abstract class AbstractBaseController {
	public readonly path: string;
	public readonly route: Hono;

	constructor({ path }: AbstractBaseControllerParams) {
		this.path = path;
		this.route = new Hono();
	}

	abstract mapRoute(): void;
}
