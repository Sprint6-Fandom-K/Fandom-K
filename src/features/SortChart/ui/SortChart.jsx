import { IdolChartCard } from "@/entities/IdolChartCard";
import { MenuButton } from "@/shared/Button";
import { FlexContainer, FlexItemContainer } from "@/shared/Container/Container";
import { getCharts } from "@/shared/api/api";
import { useGetData } from "@/shared/hooks/hooks";
import { MenuButtonDescription } from "@/shared/typo/typo";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ChartList = styled.ul`
	width: 100%;
	height: 418px;
	display: grid;
	grid-template: repeat(5, 1fr) / 1fr 1fr;
	@media (width<=1199px) {
		grid-template: repeat(5, 1fr) / 1fr;
	}
`;

export const SortChart = ({ onChange, gender }) => {
	const isMale = gender == "male";
	const [status, wrappedFunction] = useGetData(getCharts);
	const [items, setItems] = useState([]);

	const handleClick = (e) => {
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
	}, [gender]);

	return (
		<>
			<FlexContainer>
				<FlexItemContainer $flex="1">
					<MenuButton
						name="female"
						onClick={handleClick}
						$isactive={`${!isMale}`}
					>
						<MenuButtonDescription>이달의 여자 아이돌</MenuButtonDescription>
					</MenuButton>
				</FlexItemContainer>
				<FlexItemContainer $flex="1">
					<MenuButton name="male" onClick={handleClick} $isactive={`${isMale}`}>
						<MenuButtonDescription>이달의 남자 아이돌</MenuButtonDescription>
					</MenuButton>
				</FlexItemContainer>
			</FlexContainer>
			<ChartList>
				{status.isLoading ? (
					<div>로딩중인 무언가</div>
				) : (
					items?.map((item, index) => (
						<IdolChartCard key={item.id} item={item} index={index} />
					))
				)}
			</ChartList>
		</>
	);
};
