import { IdolChartCard } from "@/entities/IdolChartCard";
import { MenuButton, MoreItemsButton } from "@/shared/Button";
import { FlexContainer, FlexItemContainer } from "@/shared/Container/Container";
import { getCharts } from "@/shared/api/api";
import { useCustomMediaQuery } from "@/shared/hooks/useCustomMediaQuery";
import { useGetData } from "@/shared/hooks/useGetData";
import {
	MenuButtonDescription,
	moreButtonDescription,
} from "@/shared/typo/typo";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import refresh from "@/shared/asset/icons8-refresh-30.png";

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

const NewMoreItemsButton = styled(MoreItemsButton)`
	margin-top: 24px;
	${moreButtonDescription};
	@media (width<=1199px) {
		margin-top: 3px;
	}
	@media (width<=767px) {
		margin-top: 9px;
	}
`;

const MoreItemsContainer = styled(FlexItemContainer)`
	display: flex;
	justify-content: center;
`;

const ReloadSection = styled.div`
	grid-column: 1/-1;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const SortChart = ({ onChange, gender }) => {
	const [status, wrappedFunction] = useGetData(getCharts);
	const { isNotDesktop } = useCustomMediaQuery();

	const [items, setItems] = useState([]);
	const [moreItems, setMoreItems] = useState(0);
	const numberOfItem = useMemo(
		() => (isNotDesktop ? 5 + moreItems : 10 + moreItems * 2),
		[moreItems, isNotDesktop],
	);
	const noMoreItem = numberOfItem < items.length;

	const sortedItems = useMemo(() => {
		const sortedData = items.sort((a, b) => a.totalVotes > b.totalVotes);
		const SlicedData = sortedData.slice(0, numberOfItem);
		return SlicedData;
	}, [numberOfItem, items]);

	const isMale = gender == "male";

	const handleMenuClick = (e) => {
		if (gender === e.currentTarget.name) return;
		onChange(e.currentTarget.name);
	};

	const handleButtonClick = (_) => {
		setMoreItems((prevMoreItems) => prevMoreItems + 5);
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
			<ChartList $numbers={numberOfItem}>
				{status.isLoading ? (
					<div>로딩화면</div>
				) : (
					<>
						{sortedItems?.map((item, index) => (
							<IdolChartCard key={item.id} item={item} index={index} />
						))}
						{noMoreItem && (
							<ReloadSection>
								<img src={refresh} />
							</ReloadSection>
						)}
					</>
				)}
			</ChartList>
			{status.isLoading || (
				<MoreItemsContainer $flex="1">
					<NewMoreItemsButton onClick={handleButtonClick}>
						더 보기
					</NewMoreItemsButton>
				</MoreItemsContainer>
			)}
		</>
	);
};
