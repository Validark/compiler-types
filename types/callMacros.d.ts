/// <reference no-default-lib="true"/>

/** Throws an error if the provided value is false or nil. */
declare function assert<T>(condition: T, message?: string): asserts condition;

/** Returns the type of the given object as a string. This function works similarly to Lua’s native type function, with the exceptions that Roblox-defined data types like Vector3 and CFrame return their respective data types as strings. */
declare function typeOf(value: any): keyof CheckableTypes;

/**
 * Returns true if `typeof(value) == type`, otherwise false.
 * This function allows for type narrowing. i.e.
```
// v is unknown
if (typeIs(v, "Vector3")) {
	print(v.X, v.Y, v.Z);
}
```
 **/
declare function typeIs<T extends keyof CheckableTypes>(value: any, type: T): value is CheckableTypes[T];

/**
 * Calls the function func with the given arguments in protected mode.
 *
 * opcall is an easier to use version of pcall. It returns a result object instead of multiple returns.
 **/
declare function opcall<T extends Array<any>, U>(
	func: (...args: T) => U,
	...args: T
): { success: true; value: U } | { success: false; error: string };

/**
 * Returns true if `instance.ClassName == Q`, otherwise false.
 * This function allows for ClassName narrowing. i.e.
 * @example
 * if (classIs(o, "LocalScript")) {
 * // o is a LocalScript
 * }
 * if (classIs(o, "Script")) {
 * // o is a Script & { ClassName: "Script" }
 * // Notice how it specifies the ClassName property here.
 * // This is because a `LocalScript` is-a `Script`, but `o` refers to
 * // an instance for which `ClassName` is "Script"
 * }
 * @param instance
 * @param className
 */
declare function classIs<
	T extends Instance,
	Q extends Extract<T["ClassName"], Exclude<keyof Instances, keyof AbstractInstances>>
>(
	instance: T,
	className: Q,
): instance is Instances[Q] extends T
	? Instances[Q]["ClassName"] extends Q
		? Instances[Q]
		: Instances[Q] & { ClassName: Q }
	: T;

/**
 * Returns the passed argument.
 *
 * This is useful for ensuring that a value matches the given type in areas where it is not directly possible to do so.
 * @example
 * type P = { x: number, y: number };
 * const obj = {
 *   pos: identity<P>({ x: 5, y: 10 });
 * }
 */
declare function identity<T>(arg: T): T;

/**
 * This variable will be automatically replaced by the "version" string from the package.json file
 */
declare const PKG_VERSION: string;
