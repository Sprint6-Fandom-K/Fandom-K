import { IdolChartCard } from "@/entities/IdolChartCard";
import { MenuButton } from "@/shared/Button";
import { FlexContainer, FlexItemContainer } from "@/shared/Container/Container";
import { getCharts } from "@/shared/api/api";
import { useGetData } from "@/shared/hooks/hooks";
import { MenuButtonDescription } from "@/shared/typo/typo";
import { useEffect, useState } from "react";

export const SortChart = ({ onChange, gender }) => {
	const isMale = gender == "male";
	const [status, wrappedFunction] = useGetData(getCharts);
	const [items, setItems] = useState([]);

	const handleClick = (e) => {
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
			{
				status.isLoading ? (
					<div>로딩</div>
				) : (
					<div>
						{console.log(items)}
						{items &&
							items?.map((v) => (
								<IdolChartCard key={v.id}>{v.name} 안녕!!</IdolChartCard>
							))}
					</div>
				) /*리스트 */
			}
		</>
	);
};
