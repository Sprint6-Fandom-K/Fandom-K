export default class Capsule
{
	#getter;
	#setter;

	constructor({ get, set })
	{
		this.#getter = get ?? (function () { throw new Error("Unimplemented") });
		this.#setter = set ?? (function () { throw new Error("Unimplemented") });
	}

	get()
	{
		return this.#getter();
	}

	set(value)
	{
		this.#setter(value);
	}
}
