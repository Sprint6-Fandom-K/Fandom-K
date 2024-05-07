import IdolChartCard from "@/entities/card/ui/IdolChartCard";
import { getCharts } from "@/shared/api/api";
import { useGetData } from "@/shared/hooks/useGetData";
import IdolChartCardSkeleton from "@/entities/card/skeletons/IdolChartCardSkeleton";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { useInView } from "react-intersection-observer";

const ChartList = styled.ul`
	width: 100%;
	height: 418px;
	overflow: auto;
	column-gap: 24px;
	grid-template: repeat(5, 1fr) / 1fr 1fr;
	@media (width<=1199px) {
		grid-template: repeat(5, 1fr) / 1fr;
	}
`;

export default function SortChart({ gender, isactive }) {
	const rootRef = useRef(null);
	const [items, setItems] = useState([]);
	const [cursor, setCursor] = useState(0);
	const [status, wrappedFunction] = useGetData(getCharts);
	const { ref, inView } = useInView({
		threshold: 0,
		root: rootRef.current,
	});
	async function executeRefresh() {
		const { idols, nextCursor } = await wrappedFunction({
			gender,
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

	return (
		<ChartList
			ref={rootRef}
			style={{ display: isactive === true ? "grid" : "none" }}
		>
			{items?.map((item, index) => (
				<IdolChartCard key={item.id} item={item} index={index} ref={ref} />
			))}
			{status.isLoading &&
				Array.from(Array(10)).map((_, index) => (
					<IdolChartCardSkeleton key={index} />
				))}
		</ChartList>
	);
}
