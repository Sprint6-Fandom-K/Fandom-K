import { css, styled } from "styled-components";

const buttonStyle = css`
	color: white;
	&:hover {
		cursor: pointer;
	}
`;

export const PinkButton = styled.button.attrs({
	type: "button",
})`
	background: linear-gradient(90deg, #f86f65 0%, #fe5493 100%);
	width: ${({ width }) => width ?? "128px"};
	height: ${({ height }) => height ?? "32px"};
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
