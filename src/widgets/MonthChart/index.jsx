import styled from "styled-components";
import { useState } from "react";

import { PinkButton } from "@/shared/Button";
import { FlexContainer } from "@/shared/Container/Container";
import { ButtonDescription, SubTitle } from "@/shared/typo/typo";

import ChartButton from "@/shared/asset/ChartButton.svg";
import SortChart from "@/features/SortChart";

const NewPinkButton = styled(PinkButton)`
	display: flex;
	align-items: center;
	gap: 4px;
`;

const MainFlexContainer = styled(FlexContainer)`
	@media (width<=767px) {
		gap: "16px";
	}
`;

export default function MonthChart() {
	const [gender, setGender] = useState("female");

	return (
		<FlexContainer $fd="column" $gap="24px">
			<FlexContainer $jc="space-between">
				<SubTitle>이달의 차트</SubTitle>
				<NewPinkButton>
					<img width="24px" src={ChartButton} />
					<ButtonDescription>차트 투표하기</ButtonDescription>
				</NewPinkButton>
			</FlexContainer>
			<SortChart onChange={setGender} gender={gender} />
			{/* 더보기 : 누르면 수를 늘림 (근데 이거 무한 스크롤 하고 싶긴 함) */}
		</FlexContainer>
	);
}
