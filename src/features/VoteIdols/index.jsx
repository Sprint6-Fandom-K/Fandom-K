import { PinkButton } from "@/shared/ui/Button";
import { FlexContainer } from "@/shared/ui/Container";
import { useCallback, useState } from "react";
import styled from "styled-components";
import VoteIdols from "@/features/VoteIdols/modal";
import ChartButton from "@/shared/assets/icons/ChartButton";
import Modal from "@/shared/ui/Modal";

const ButtonDescription = styled.span`
	color: white;
	word-break: keep-all;
	width: 72px;
	height: 26px;
	font-size: 11px;
	font-weight: 700;
	line-height: 26px;
	letter-spacing: 0.02em;
	text-align: left;
`;

const SubTitle = styled.span`
	font-size: 24px;
	font-weight: 700;
	line-height: 26px;
	text-align: left;
	color: white;
	@media (width<=1199px) {
		font-size: 20px;
	}
	@media (width<=767px) {
		font-size: 16px;
	}
`;

const NewPinkButton = styled(PinkButton)`
	display: flex;
	align-items: center;
	gap: 4px;
`;

export default function CreateVoteModal({ gender }) {
	const [showVoteModal, setShowVoteModal] = useState(false);

	const handleClick = useCallback(() => setShowVoteModal(true), []);

	const handleCancel = useCallback(() => setShowVoteModal(false), []);

	return (
		<FlexContainer $jc="space-between">
			<SubTitle>이달의 차트</SubTitle>

			<NewPinkButton onClick={handleClick} height="32px" width="128px">
				<ChartButton />
				<ButtonDescription>차트 투표하기</ButtonDescription>
			</NewPinkButton>
			{showVoteModal && (
				<Modal>
					<VoteIdols onCancel={handleCancel} gender={gender} />
				</Modal>
			)}
		</FlexContainer>
	);
}
