import React from "react";
import AddButton from "./AddButton";

const Button = styled.button`
	padding: 11px 83px;
	margin: 0 auto;
	border-radius: 24px;
	border: none;
	color: white;
	background: ${({ theme }) => theme.colors.brand[0]};
	font-size: 16px;
	font-weight: 700;
	line-height: 1.6;
	display: flex;
	align-items: center;
	gap: 8px;

	&icon {
		width: 24px;
		height: 24px;
	}

	&span {
		font-weight: 700;
	}
`;
/*추가하기 버튼누르면 추가할 아이돌카드 항목 보여주는 것*/
function AddButton({ onClick, label }) {
	return (
		<Button aria-label={`${label} 추가하기`} onClick={onClick}>
			<plusIcon />
		</Button>
	);
}

export default AddButton;
