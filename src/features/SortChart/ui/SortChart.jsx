import { IdolChartCard } from "@/entities/IdolChartCard";
import { MenuButton, MoreItemsButton } from "@/shared/Button";
import { FlexContainer, FlexItemContainer } from "@/shared/Container/Container";
import { getCharts } from "@/shared/api/api";
import { useCustomMediaQuery } from "@/shared/hooks/useCustomMediaQuery";
import { useGetData } from "@/shared/hooks/useGetData";
import {
	MenuButtonDescription,
	MoreButtonDescription,
} from "@/shared/typo/typo";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const ChartList = styled.ul`
	width: 100%;
	height: 418px;
	display: grid;
	grid-template: repeat(${({ $numbers }) => Math.floor($numbers / 2)}, 1fr) / 1fr 1fr;
	@media (width<=1199px) {
		grid-template: repeat(${({ $numbers }) => Math.floor($numbers)}, 1fr) / 1fr;
	}
`;

const NewMoreItemsButton = styled(MoreItemsButton)`
	margin-top: 24px;
	${MoreButtonDescription};
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

export const SortChart = ({ onChange, gender }) => {
	const [status, wrappedFunction] = useGetData(getCharts);
	const [items, setItems] = useState([]);
	const [moreItems, setMoreItems] = useState(0);
	const { isNotDesktop } = useCustomMediaQuery();
	const isMale = gender == "male";
	const numberOfItem = useMemo(
		() => (isNotDesktop ? 5 + moreItems : 10 + moreItems * 2),
		[moreItems, isNotDesktop],
	);

	const handleMenuClick = (e) => {
		if (gender === e.currentTarget.name) return;
		onChange(e.currentTarget.name);
	};

	const handleButtonClick = () => {
		setMoreItems((prevMoreItems) => prevMoreItems + 5);
	};

	useEffect(() => {
		let fetchData = async () => {
			let data = await wrappedFunction({ gender });
			if (!data) return;
			data = data.slice(0, numberOfItem);
			setItems((prevItem) => data);
			console.log(numberOfItem);
		};
		fetchData();
		return () => (fetchData = null);
	}, [gender, moreItems]);

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
					items?.map((item, index) => (
						<IdolChartCard key={item.id} item={item} index={index} />
					))
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
