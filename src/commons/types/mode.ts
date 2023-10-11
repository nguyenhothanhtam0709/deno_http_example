// deno-lint-ignore no-explicit-any
export interface Type<T = any> extends Function {
	// deno-lint-ignore no-explicit-any
	new (...args: any[]): T;
}
