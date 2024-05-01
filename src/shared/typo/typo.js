import styled, { css } from "styled-components";

export const SubTitle = styled.span`
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

export const ButtonDescription = styled.span`
	color: white;
	font-family: Pretendard;
	word-break: keep-all;
	width: 72px;
	height: 26px;
	font-size: 11px;
	font-weight: 700;
	line-height: 26px;
	letter-spacing: 0.02em;
	text-align: left;
`;

export const MenuButtonDescription = styled.span`
	font-family: Pretendard;
	color: #ffffff;
	font-size: 14px;
	font-weight: 400;
	line-height: 18px;
	text-align: center;
	letter-spacing: -0.16500002145767212px;
`;

export const moreButtonDescription = css`
	font-size: 11px;
	font-weight: 700;
	line-height: 26px;
	color: #ffffff;
`;

export const chartItemDescription = css`
	font-family: Pretendard;
	font-size: 14px;
	font-weight: 400;
	line-height: 16.71px;
	color: #ffffff99;
`;

export const chartItemName = css`
	${chartItemDescription}
	font-weight: 500;
	color: #ffffffde;
`;

export const chartItemIndex = css`
	${chartItemDescription};
	color: #f96d69;
`;
