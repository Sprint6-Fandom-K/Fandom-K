function TODO()
{
	throw new Error("Unimplemented");
}

/** @see https://fandom-k-api.vercel.app/docs/ */
export default class API {
	static #query(mandatory = {}, optional = {}) {
		const params = new URLSearchParams();

		for (const [key, value] of Object.entries(mandatory)) {
			params.set(key, value);
		}
		for (const [key, value] of Object.entries(optional)) {
			if (value !== undefined) params.set(key, value);
		}
		return params;
	}

	static get ["{team_name}/idols"]() {
		return new Request({
			// eslint-disable-next-line no-undef
			GET(
				path = { team_name: "6-11" },
				query = { page_size: 10, cursor, keyword },
			) {
				return `https://fandom-k-api.vercel.app/${path.team_name}/idols?${API.#query({ pageSize: query.page_size }, { cursor: query.cursor, keyword: query.keyword }).toString()}`;
			},
		});
	}

	static get ["{team_name}/donations"]() {
		return new Request({
			// eslint-disable-next-line no-undef
			GET(
				path = { team_name: "6-11" },
				query = { page_size: 10, cursor, priority_idol_ids },
			) {
				return `https://fandom-k-api.vercel.app/${path.team_name}/donations?${API.#query({ pageSize: query.page_size }, { cursor: query.cursor, priorityIdolIds: query.priority_idol_ids }).toString()}`;
			},
			// eslint-disable-next-line no-unused-vars
			PUT(path = { team_name: "6-11", id: 0 }, query = {}) {
				return `https://fandom-k-api.vercel.app/${path.team_name}/donations/${path.id}`;
			},
			// eslint-disable-next-line no-unused-vars
			POST(path = { team_name: "6-11" }, query = {}) {
				return `https://fandom-k-api.vercel.app/${path.team_name}/donations`;
			},
		});
	}

	static get ["{team_name}/charts/{gender}"]() {
		return new Request({
			// eslint-disable-next-line no-unused-vars
			GET(
				{ team_name = "6-11", gender = null },
				query = { page_size: 10, cursor },
			) {
				return `https://fandom-k-api.vercel.app/${team_name}/charts/${gender}?${API.#query({ pageSize: query.page_size }, { cursor: query.cursor }).toString()}`;
			},
		});
	}
}

class Request
{
	#GET; #PUT; #POST; #DELETE;

	constructor({ GET = TODO, PUT = TODO, POST = TODO, DELETE = TODO })
	{
		this.#GET = GET;
		this.#PUT = PUT;
		this.#POST = POST;
		this.#DELETE = DELETE;
	}

	async GET(path, query)
	{
		return await (await fetch(this.#GET(path, query), { method: "GET" })).json();
	}

	async PUT(path, query, body)
	{
		return await (await fetch(this.#PUT(path, query), { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })).json();
	}

	async POST(path, query, body)
	{
		return await (await fetch(this.#POST(path, query), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })).json();
	}

	async DELETE(path, query)
	{
		return await (await fetch(this.#DELETE(path, query), { method: "DELETE" })).json();
	}
}
