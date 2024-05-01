// 마이페이지 idol 목록 불러오기 api

export const getIdols = async () => {
	try {
		const response = await fetch("https://fandom-k-api.vercel.app/6-11/idols");
		const body = await response.json();
		return body;
	} catch (error) {
		throw new Error("getIdols api error", error);
	}
};
