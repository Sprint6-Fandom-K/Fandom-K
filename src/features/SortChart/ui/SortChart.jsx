import { IdolChartCard } from "@/entities/IdolChartCard";
import { MenuButton } from "@/shared/Button";
import { FlexContainer, FlexItemContainer } from "@/shared/Container/Container";
import { getCharts } from "@/shared/api/api";
import { useCustomMediaQuery } from "@/shared/hooks/useCustomMediaQuery";
import { useGetData } from "@/shared/hooks/useGetData";
import { MenuButtonDescription } from "@/shared/typo/typo";
import { useEffect, useMemo, useState, useRef } from "react";
import styled from "styled-components";

import refresh from "@/shared/asset/icons8-refresh-30.png";
import { rotate } from "@/shared/keyframes/keyframes";
import { useInView } from "react-intersection-observer";

const ChartList = styled.ul`
	width: 100%;
	height: 418px;
	overflow: auto;
	display: grid;
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

const RefreshImg = styled.img`
	animation: ${rotate} 1s linear infinite;
`;

export const SortChart = ({ onChange, gender }) => {
	const rootRef = useRef(null);
	const [items, setItems] = useState([]);
	const [moreItems, setMoreItems] = useState(0);

	const [status, wrappedFunction] = useGetData(getCharts);
	const { isNotDesktop } = useCustomMediaQuery();
	const { ref, inView, entry } = useInView({
		threshold: 1,
		root: rootRef.current,
	});

	const numberOfItem = useMemo(
		() => (isNotDesktop ? 5 + moreItems : 10 + moreItems * 2),
		[moreItems, isNotDesktop],
	);
	const sortedItems = useMemo(() => {
		const sortedData = items.sort((a, b) => a.totalVotes > b.totalVotes);
		const SlicedData = sortedData.slice(0, numberOfItem);
		return SlicedData;
	}, [numberOfItem, items]);

	const isMale = gender == "male";
	const noMoreItem = numberOfItem < items.length;

	const handleMenuClick = (e) => {
		if (gender === e.currentTarget.name) return;
		onChange(e.currentTarget.name);
	};

	useEffect(() => {
		let fetchData = async () => {
			const data = await wrappedFunction({ gender });
			if (!data) return;
			setItems((prevItem) => data);
		};
		fetchData();
		return () => (fetchData = null);
	}, [gender]);

	useEffect(() => {
		setMoreItems((prevItem) => 0);
	}, [isNotDesktop, gender]);

	useEffect(() => {
		if (inView) setMoreItems((prevMoreItems) => prevMoreItems + 5);
	}, [inView]);

	return (
		<>
			<FlexContainer>
				<FlexItemContainer $flex="1">
					<MenuButton
						name="female"
						onClick={handleMenuClick}
						$isactive={`${!isMale}`}
					>
						<MenuButtonDescription>이달의 여자 아이돌</MenuButtonDescription>
					</MenuButton>
				</FlexItemContainer>
				<FlexItemContainer $flex="1">
					<MenuButton
						name="male"
						onClick={handleMenuClick}
						$isactive={`${isMale}`}
					>
						<MenuButtonDescription>이달의 남자 아이돌</MenuButtonDescription>
					</MenuButton>
				</FlexItemContainer>
			</FlexContainer>
			<ChartList $numbers={numberOfItem} ref={rootRef}>
				{status.isLoading ? (
					<div>로딩화면</div>
				) : (
					<>
						{sortedItems?.map((item, index) => (
							<IdolChartCard key={item.id} item={item} index={index} />
						))}
						{noMoreItem && (
							<RefreshSection ref={ref}>
								<div>{inView}</div>
								<RefreshImg src={refresh} />
							</RefreshSection>
						)}
					</>
				)}
			</ChartList>
		</>
	);
};
