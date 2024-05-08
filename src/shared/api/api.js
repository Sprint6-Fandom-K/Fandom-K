import { BASE_URL } from "../constant/constant";

export async function getChart({ gender, cursor }) {
	if (cursor == null) {
		return;
	}
	const URL = `${BASE_URL}/charts/{gender}`;
	const query = new URLSearchParams({ gender, cursor: cursor });
	const response = await fetch(`${URL}?${query.toString()}`);
	const data = await response.json();
	const nextCursor = data.nextCursor;
	const idols = data.idols;
	return { idols, nextCursor };
}
