import { BASE_URL } from "../constant/constant";

export async function getCharts({ gender, cursor }) {
	const URL = `${BASE_URL}/charts/{gender}`;
	const query = new URLSearchParams({ gender, cursor: cursor ?? 0 });
	const response = await fetch(`${URL}?${query.toString()}`);
	const data = await response.json();
	const nextCursor = data.nextCursor;
	const idols = data.idols;
	return { idols, nextCursor };
}
