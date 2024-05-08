import { useEffect, useRef, useState } from "react";
import { useGetData } from "./useGetData";
import { useInView } from "react-intersection-observer";

export default function useInfiniteScroll(fetchFunction, options) {
	const rootRef = useRef(null);
	const [items, setItems] = useState([]);
	const [cursor, setCursor] = useState(0);
	const [status, wrappedFunction] = useGetData(fetchFunction);
	const { ref, inView } = useInView({
		threshold: 0,
		root: rootRef.current,
	});

	async function executeRefresh() {
		const { idols, nextCursor } = await wrappedFunction({
			...options,
			cursor,
		});
		if (!idols) return;
		setCursor(nextCursor);
		setItems([...items, ...idols]);
	}

	useEffect(() => {
		if (inView) {
			executeRefresh();
		} else if (items.length === 0) {
			executeRefresh();
		}
	}, [inView]);

	return { items, ref, status, rootRef };
}
