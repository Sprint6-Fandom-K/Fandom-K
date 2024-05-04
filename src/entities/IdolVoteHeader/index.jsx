import ArrowLeft from "@/shared/assets/icons/ArrowLeft";
import ModalCancelIcon from "@/shared/assets/icons/ModalCancelIcon";
import { useCustomMediaQuery } from "@/shared/hooks/useCustomMediaQuery";
import { ModalTitleTypo } from "@/shared/typo/typo";
import styled from "styled-components";

const VoteTitle = styled.h2`
	display: flex;
	align-items: center;
	${ModalTitleTypo}
`;

const VoteHeaderContainer = styled.div`
	@media (width<=767px) {
		background-color: #02000ecc;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		height: 67px;
		z-index: 3;
	}
	display: flex;
	justify-content: space-between;
`;

const CancelButton = styled.button`
	background-color: inherit;
	border: none;
	&:hover {
		cursor: pointer;
	}
`;

export default function ({ gender, onCancel }) {
	const { isMobile } = useCustomMediaQuery();
	return (
		<>
			{isMobile ? (
				<VoteHeaderContainer>
					<CancelButton onClick={onCancel}>
						<ArrowLeft width="24" />
					</CancelButton>
					<VoteTitle>
						이달의 {gender === "male" ? "남자" : "여자"} 아이돌
					</VoteTitle>
					<div style={{ width: "24px" }}></div>
				</VoteHeaderContainer>
			) : (
				<VoteHeaderContainer>
					<VoteTitle>
						이달의 {gender === "male" ? "남자" : "여자"} 아이돌
					</VoteTitle>
					<CancelButton onClick={onCancel}>
						<ModalCancelIcon />
					</CancelButton>
				</VoteHeaderContainer>
			)}
		</>
	);
}
