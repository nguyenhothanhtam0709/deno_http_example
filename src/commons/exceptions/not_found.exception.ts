import { HTTPException } from 'hono/http-exception';

export class HttpNotFoundException extends HTTPException {
	constructor() {
		super(404, {
			res: new Response('NOT FOUND', {
				status: 404,
			}),
		});
	}
}
