import IdolChartCard from "@/entities/IdolChartCard";
import { getCharts } from "@/shared/api/api";
import { useGetData } from "@/shared/hooks/useGetData";
import { useEffect, useMemo, useState, useRef } from "react";
import styled from "styled-components";

import refresh from "@/shared/asset/icons8-refresh-30.png";

import { rotate } from "@/shared/keyframes/keyframes";
import { useInView } from "react-intersection-observer";

const ChartList = styled.ul`
	width: 100%;
	height: 418px;
	overflow: auto;
	display: ${({ $isdisplay }) => ($isdisplay === "true" ? "none" : "grid")};
	column-gap: 24px;
	grid-template: repeat(${({ $numbers }) => Math.floor($numbers / 2)}, 1fr) / 1fr 1fr;
	@media (width<=1199px) {
		grid-template: repeat(${({ $numbers }) => Math.floor($numbers)}, 1fr) / 1fr;
	}
`;

const RefreshSection = styled.div`
	grid-column: 1/-1;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const RotateImg = styled.img`
	animation: ${rotate} 1s linear infinite;
`;

export default function SortChart({ gender, isfemale }) {
	const rootRef = useRef(null);
	const isMount = useRef(false);
	const [items, setItems] = useState([]);
	const [pageLimit, setPageLimit] = useState(10);
	const [cursor, setCursor] = useState(null);

	const [status, wrappedFunction] = useGetData(getCharts);
	const { ref, inView, entry } = useInView({
		threshold: 1,
		root: rootRef.current,
	});

	const sortedItems = useMemo(() => {
		return items.sort((a, b) => a.totalVotes > b.totalVotes);
	}, [items]);

	const isNoMoreItems = cursor === null && pageLimit >= items.length;

	async function executeRefresh() {
		const { idols, nextCursor } = await wrappedFunction({
			gender,
			cursor,
		});
		if (!idols) return;
		setCursor(nextCursor);
		setItems([...items, ...idols]);
		setPageLimit(pageLimit + 10);
	}

	useEffect(() => {
		executeRefresh();
	}, [inView]);

	return (
		<ChartList $numbers={pageLimit} ref={rootRef} $isdisplay={`${isfemale}`}>
			{sortedItems?.map((item, index) => (
				<IdolChartCard key={item.id} item={item} index={index} />
			))}
			{!isNoMoreItems && !status.isLoading && (
				<RefreshSection ref={ref}>
					<img src={refresh} />
				</RefreshSection>
			)}
			{status.isLoading && (
				<RefreshSection>
					<RotateImg src={refresh} />
				</RefreshSection>
			)}
		</ChartList>
	);
}
