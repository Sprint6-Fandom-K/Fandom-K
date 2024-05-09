import { FlexContainer } from "@/shared/ui/Container";
import styled from "styled-components";

export const PageBody = styled.main`
	background-color: #02000e;
	display: flex;
	justify-content: center;
	padding-bottom: 243px;
	overflow: auto;
	@media (width<=1199px) {
		padding-bottom: 330px;
		padding-inline: 20px;
	}
	@media (width<=767px) {
		padding-bottom: 59px;
		padding-inline: 24px;
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #02000e;
	width: 1200px;
	@media (width<=1199px) {
		width: 100%;
		overflow: hidden;
	}
`;

export const ChartSection = styled(FlexContainer)`
	margin-top: 80px;
	@media screen and (width<=1199px) {
		margin-top: 60px;
	}
	@media screen and (width<=767px) {
		margin-top: 40px;
	}
`;

export const PendingDonationsSection = styled.div`
	margin-top: 50px;
	@media screen and (width<=1199px) {
		margin-top: 64px;
	}
	@media screen and (width<=767px) {
		margin-top: 40px;
	}
`;

export const ButtonDescription = styled.span`
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
