import { BASE_URL } from "../constant/constant";

export async function getCharts({ gender }) {
	const URL = `${BASE_URL}/charts/{gender}`;
	const response = await fetch(`${URL}?gender=${gender}`);
	const body = await response.json();
	return body;
}
