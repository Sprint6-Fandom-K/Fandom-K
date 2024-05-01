import { css, styled } from "styled-components";

const buttonStyle = css`
	&:hover {
		cursor: pointer;
	}
`;

export const PinkButton = styled.button.attrs({ type: "button" })`
	background: linear-gradient(90deg, #f86f65 0%, #fe5493 100%);
	width: 128px;
	height: 32px;
	padding: 3.5px 14px 4.5px;
	border: 0;
	border-radius: 3px;
	${buttonStyle};
`;

export const MenuButton = styled.button`
	background-color: ${({ $isactive }) =>
		$isactive == "true" ? "#FFFFFF1A" : "inherit"};
	height: 42px;
	padding: 12px;
	width: 100%;
	border: 0;
	border-bottom: ${({ $isactive }) =>
		$isactive == "true" ? "1px solid white" : null};
	${buttonStyle};
`;

export const MoreItemsButton = styled.button`
	width: 326px;
	height: 42px;
	padding: 8px 143px;
	border-radius: 3px;
	border: 1px solid #f1eef9cc;
	background-color: #ffffff1a;
	${buttonStyle};
`;
