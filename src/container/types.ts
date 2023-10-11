import type { Type } from "../commons/types/mode.ts";
import type { InjectScope } from "./enum.ts";

type Newable<T> = new (...args: never[]) => T;
interface Abstract<T> {
	prototype: T;
}
export type ServiceIdentifier<T = unknown> =
	| string
	| symbol
	| Newable<T>
	| Abstract<T>;

export type ProvideToken = string | symbol;

// deno-lint-ignore no-explicit-any
export type ClassProvider<T = any> = {
	provide: ProvideToken;
	useClass: Type<T>;
	scope?: InjectScope;
};

// deno-lint-ignore no-explicit-any
export type Provider<T = any> = ClassProvider<T>;

export type DIContainerParams = {
	providers: Array<Provider>;
};
