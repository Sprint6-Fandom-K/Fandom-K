import styled from "styled-components";
import { useMemo, useState } from "react";

import { PinkButton } from "@/shared/Button";
import { FlexContainer } from "@/shared/Container/Container";
import { ButtonDescription, SubTitle } from "@/shared/typo/typo";

import ChartButton from "@/shared/asset/ChartButton.svg";
import SortChart from "@/features/SortChart";
import SelectGender from "@/features/SelectGender";

const NewPinkButton = styled(PinkButton)`
	display: flex;
	align-items: center;
	gap: 4px;
`;

export default function MonthChart() {
	const [gender, setGender] = useState("female");
	const isFemale = useMemo(() => gender === "male", [gender]);
	return (
		<FlexContainer $fd="column" $gap="24px">
			<FlexContainer $jc="space-between">
				<SubTitle>이달의 차트</SubTitle>
				<NewPinkButton>
					<img width="24px" src={ChartButton} />
					<ButtonDescription>차트 투표하기</ButtonDescription>
				</NewPinkButton>
			</FlexContainer>
			<SelectGender onChange={setGender} gender={gender} isfemale={isFemale} />
			<SortChart gender="male" isfemale={!isFemale} />
			<SortChart gender="female" isfemale={isFemale} />
			{/* display: none으로 아예 두개를 만들어라. */}
		</FlexContainer>
	);
}
