import IdolChartCard from "@/entities/card/ui/IdolChartCard";
import { getCharts } from "@/shared/api/api";
import { useGetData } from "@/shared/hooks/useGetData";
import IdolChartCardSkeleton from "@/entities/card/skeletons/IdolChartCardSkeleton";
import { useEffect, useMemo, useState, useRef } from "react";
import styled from "styled-components";

import { useInView } from "react-intersection-observer";
import RefreshIcon from "@/shared/assets/icons/RefreshIcon";
import { rotate } from "@/shared/styles/keyframes";

const RotateIcon = styled(RefreshIcon)`
	animation: ${rotate} 2s ease-in-out infinite;
`;

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

export default function SortChart({ gender, isfemale }) {
	const rootRef = useRef(null);
	const [items, setItems] = useState([]);
	const [pageLimit, setPageLimit] = useState(10);
	const [cursor, setCursor] = useState(null);

	const [status, wrappedFunction] = useGetData(getCharts);
	const { ref, inView } = useInView({
		threshold: 1,
		root: rootRef.current,
	});
	const sortedItems = useMemo(() => {
		return items.sort((a, b) => a.totalVotes > b.totalVotes);
	}, [items]);

	const isNoMoreItems = cursor === null && pageLimit >= items.length;

	useEffect(() => {
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
		if (inView) {
			executeRefresh();
		} else if (items.length === 0) {
			executeRefresh();
		}
		return () => (executeRefresh = null);
	}, [inView]);

	return (
		<ChartList $numbers={pageLimit} ref={rootRef} $isdisplay={`${isfemale}`}>
			{sortedItems?.map((item, index) => (
				<IdolChartCard key={item.id} item={item} index={index} />
			))}
			{status.isLoading &&
				Array.from(Array(10)).map((v, index) => (
					<IdolChartCardSkeleton key={index} />
				))}
			{!status.isLoading && !isNoMoreItems && (
				<RefreshSection ref={ref}>
					<RotateIcon />
				</RefreshSection>
			)}
		</ChartList>
	);
}
