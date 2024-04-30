import { BASE_URL } from "../constant/constant";

export async function getCharts({ gender }) {
	const response = await fetch(`${BASE_URL}/charts/${gender}`);
	const body = await response.json();
	return body;
}
