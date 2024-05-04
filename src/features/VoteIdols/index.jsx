import IdolVoteCard from "@/entities/IdolVoteCard";
import IdolVoteCardSkeleton from "@/entities/IdolVoteCard/IdolVoteCardSkeleton";
import ModalCancelIcon from "@/shared/assets/icons/ModalCancelIcon";
import styled from "styled-components";

const BackDrop = styled.div`
	background-color: rgba(0, 0, 0, 0.6);
	position: absolute;
	inset: 0;
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Modal = styled.dialog`
	background-color: black;
	color: white;
	width: 525px;
	height: 693px;
	border: none;
	overflow: auto;
	@media (width<=767px) {
		height: 100%;
		width: 100%;
		z-index: 2;
	}
`;

const ModalButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: black;
	border: none;
	cursor: pointer;
`;

export default function ({ onCancel, gender }) {
	return (
		<>
			<BackDrop>
				<Modal open aria-modal="true" aria-labelledby="voteModal">
					<h2>이달의 {gender === "female" ? "여자" : "남자"} 아이돌</h2>
					<ModalButton onClick={onCancel}>
						<ModalCancelIcon />
					</ModalButton>
					{Array.from(Array(10)).map((_, index) => (
						<IdolVoteCardSkeleton key={index} />
					))}
				</Modal>
			</BackDrop>
		</>
	);
}
