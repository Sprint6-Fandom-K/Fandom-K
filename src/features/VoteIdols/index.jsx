import { PinkButton } from "@/shared/ui/Button";
import styled from "styled-components";
import VoteIdols from "@/features/VoteIdols/modal";
import ChartButton from "@/shared/assets/icons/ChartButton";
import { Modal } from "@/app";
import { forwardRef } from "react";

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

const NewPinkButton = styled(PinkButton)`
	display: flex;
	align-items: center;
	gap: 4px;
`;

export default forwardRef(function VoteModalButton({ gender, ref }) {
	const handleClick = () => {
		Modal.open(<VoteIdols gender={gender} />);
	};

	return (
		<NewPinkButton onClick={handleClick} height="32px" width="128px">
			<ChartButton />
			<ButtonDescription>차트 투표하기</ButtonDescription>
		</NewPinkButton>
	);
});
