import IdolVoteCard from "@/entities/IdolVoteCard";
import IdolVoteCardSkeleton from "@/entities/IdolVoteCard/IdolVoteCardSkeleton";
import ModalHeader from "@/entities/IdolVoteHeader";
import styled from "styled-components";

import backgroundBlueSomething from "@/shared/assets/images/backgroundBlueSomething.svg";
import { FlexContainer } from "@/shared/Container/Container";
import { PinkButton } from "@/shared/Button";
import { modalDescription } from "@/shared/typo/typo";
import { CREDIT_FOR_ONE_VOTE } from "@/shared/constant/constant";

const BackDrop = styled.div`
	background-color: rgba(0, 0, 0, 0.6);
	position: absolute;
	inset: 0;
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (width<=767px) {
		background-color: #02000e;
	}
`;

const Modal = styled.dialog`
	background-color: #181d26;
	color: white;
	width: 525px;
	height: 693px;
	border: none;
	overflow: auto;
	@media (width<=767px) {
		background-color: inherit;
		background-image: url(${backgroundBlueSomething});
		background-repeat: no-repeat;
		height: 100%;
		width: 100%;
		z-index: 2;
	}
`;

const VoteButton = styled(PinkButton)`
	@media (width<=767px) {
		position: relative;
		left: 0;
		right: 0;
		height: 42px;
	}
`;

const VoteBottom = styled(FlexContainer)`
	display: flex;
	flex-direction: column;
	gap: 8px;
	@media (width<=767px) {
		background-color: #02000ecc;
		position: fixed;
		bottom: 0;
		gap: 12px;
		z-index: 1;
		padding: 16px 24px 14px;
		left: 0;
		right: 0;
		height: 106px;
	}
`;

const ModalContentContainer = styled(FlexContainer)`
	height: 514px;
	position: relative;
	overflow: auto;
	@media (width<=767px) {
		margin-top: 67px;
		flex: 1;
	}
`;

const VoteBottomDescription = styled.div`
	text-align: center;
	${modalDescription};
`;

const CreditHighLight = styled.span`
	color: var(--orange);
`;

export default function ({ onCancel, gender }) {
	return (
		<>
			<BackDrop>
				<Modal open aria-modal="true" aria-labelledby="voteModal">
					<FlexContainer $fd="column" $gap="20px">
						<ModalHeader gender={gender} onCancel={onCancel} />
						<ModalContentContainer $fd="column" $gap="8px">
							{Array.from(Array(10)).map((_, index) => (
								<IdolVoteCardSkeleton key={index} />
							))}
						</ModalContentContainer>
						<VoteBottom>
							<VoteButton width="auto">투표하기</VoteButton>
							<VoteBottomDescription>
								투표하는 데{" "}
								<CreditHighLight>{CREDIT_FOR_ONE_VOTE}</CreditHighLight>{" "}
								크레딧이 소모됩니다.
							</VoteBottomDescription>
						</VoteBottom>
					</FlexContainer>
				</Modal>
			</BackDrop>
		</>
	);
}
