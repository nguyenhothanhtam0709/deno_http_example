import { injectable } from 'inversify';

@injectable()
export abstract class AbstractBaseController {
	public readonly path: string;

	constructor(path: string) {
		this.path = path;
	}
}
