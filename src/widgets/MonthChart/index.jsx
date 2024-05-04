import styled from "styled-components";
import { useMemo, useState } from "react";

import { PinkButton } from "@/shared/Button";
import { FlexContainer } from "@/shared/Container/Container";
import { ButtonDescription, SubTitle } from "@/shared/typo/typo";

import ChartButton from "@/shared/assets/icons/ChartButton.svg";
import SortChart from "@/features/SortChart";
import SelectGender from "@/features/SelectGender";
import { createPortal } from "react-dom";
import VoteIdols from "@/features/VoteIdols";

const NewPinkButton = styled(PinkButton)`
	display: flex;
	align-items: center;
	gap: 4px;
`;

export default function MonthChart() {
	const [gender, setGender] = useState("female");
	const [showVoteModal, setShowVoteModal] = useState(false);

	const handleClick = () => setShowVoteModal(true);

	const handleCancel = () => setShowVoteModal(false);

	const isFemale = useMemo(() => gender === "male", [gender]);
	return (
		<FlexContainer $fd="column" $gap="24px">
			<FlexContainer $jc="space-between">
				<SubTitle>이달의 차트</SubTitle>
				<NewPinkButton onClick={handleClick}>
					<img width="24px" src={ChartButton} />
					<ButtonDescription>차트 투표하기</ButtonDescription>
				</NewPinkButton>
				{showVoteModal &&
					createPortal(
						<VoteIdols
							onCancel={handleCancel}
							gender={gender}
							show={showVoteModal}
						/>,
						document.body,
					)}
			</FlexContainer>
			<SelectGender onChange={setGender} gender={gender} isfemale={isFemale} />
			<SortChart gender="male" isfemale={!isFemale} />
			<SortChart gender="female" isfemale={isFemale} />
		</FlexContainer>
	);
}
