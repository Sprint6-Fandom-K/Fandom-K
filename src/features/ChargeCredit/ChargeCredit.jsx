import CreditIcon from "@/shared/assets/icons/CreditIcon";
import { buttonStyle } from "@/shared/ui/Button";
import { FlexContainer } from "@/shared/ui/Container";
import { formatNumber } from "@/shared/utilities/format";
import styled from "styled-components";

const CreditContainer = styled(FlexContainer)`
	border-radius: 8px;
	border: 1px solid #f1eef9cc;
	height: 131px;
	padding-inline: 78px;
	@media screen and (width<=1199px) {
		padding-inline: 64px;
	}
	@media screen and (width<=767px) {
		height: 87px;
		padding-inline: 20px;
	}
`;

const CreditButton = styled.div`
	${buttonStyle};
	color: var(--orange);
	font-size: 16px;
	font-weight: 700;
	line-height: 26px;
	letter-spacing: 0.05em;
	text-align: left;
	@media screen and (width<=767px) {
		font-size: 13px;
	}
`;

const CreditDescription = styled.div`
	color: #ffffff99;
	font-size: 16px;
	font-weight: 400;
	line-height: 19.09px;
	@media screen and (width<=767px) {
		font-size: 12px;
		line-height: 14.32px;
	}
`;

const MyCredit = styled(FlexContainer)`
	color: #ffffffde;
	font-size: 24px;
	font-weight: 700;
	line-height: 26px;
	text-align: left;
`;

export default function ChargeCredit() {
	return (
		<CreditContainer $jc="space-between" $ai="center">
			<FlexContainer $fd="column" $gap="14px">
				<CreditDescription>내 크레딧</CreditDescription>
				<MyCredit $ai="center">
					{/* {formatNumber(localStorage.getItem("credit"))} */}
					<CreditIcon />
					<span>36,000</span>
				</MyCredit>
			</FlexContainer>
			<CreditButton>충전하기</CreditButton>
		</CreditContainer>
	);
}
