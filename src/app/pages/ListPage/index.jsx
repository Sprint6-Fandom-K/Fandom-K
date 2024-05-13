import PendingDonations from "./widgets/PendingDonations";
import MonthChartList from "@/app/pages/ListPage/widgets/MonthChart/MonthChartList";
import SelectGender from "@/app/pages/ListPage/widgets/MonthChart/SelectGender";
import { useMemo, useState } from "react";
import { PinkButton } from "@/common/ui/Button";
import VoteIdols from "@/common/modal/VoteModal";
import ChartButton from "@/common/assets/icons/ChartButton";
import { Modal } from "@/app";

import ChargeCredit from "@/app/pages/ListPage/widgets/ChargeCredit/ChargeCredit";

import { Heading } from "@/common/ui/Heading";
import { headingTitle } from "@/common/styles/typo";
import styled from "styled-components";
import { FlexContainer } from "@/common/ui/Container";
import Header from "@/common/ui/Header";

export default function ListPage() {
	const [gender, setGender] = useState("female");

	const handleClick = () => {
		Modal.open(
			<VoteIdols gender={gender} onReVote={handleClick} />,
			Modal.shake,
		);
	};

	const isFemale = useMemo(() => gender === "female", [gender]);

	return (
		<PageBody>
			<Content>
				<Header />
				<ChargeCredit />
				<PendingDonationsSection>
					<PendingDonationsHeading>
						<HeadingTitle>후원을 기다리는 조공</HeadingTitle>
					</PendingDonationsHeading>
					<PendingDonations />
				</PendingDonationsSection>
				<ChartSection $fd="column" $gap="24px">
					<Heading>
						<HeadingTitle>이달의 차트</HeadingTitle>
						<NewPinkButton onClick={handleClick} height="32px" width="128px">
							<ChartButton />
							<ButtonDescription>차트 투표하기</ButtonDescription>
						</NewPinkButton>
					</Heading>
					<SelectGender
						onChange={setGender}
						gender={gender}
						isActive={isFemale}
					/>
					<MonthChartList gender="female" isactive={isFemale} />
					<MonthChartList gender="male" isactive={!isFemale} />
				</ChartSection>
			</Content>
		</PageBody>
	);
}

const PageBody = styled.main`
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

const Content = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #02000e;
	width: 1200px;
	@media (width<=1199px) {
		width: 100%;
		overflow: hidden;
	}
`;

const ChartSection = styled(FlexContainer)`
	margin-top: 80px;
	@media screen and (width<=1199px) {
		margin-top: 60px;
	}
	@media screen and (width<=767px) {
		margin-top: 40px;
	}
`;

const PendingDonationsSection = styled.div`
	margin-top: 50px;
	@media screen and (width<=1199px) {
		margin-top: 64px;
	}
	@media screen and (width<=767px) {
		margin-top: 40px;
	}
`;

const PendingDonationsHeading = styled(Heading)`
	margin-bottom: 32px;
	@media (width<=1199px) {
		margin-bottom: 24px;
	}
	@media (width<=767px) {
		margin-bottom: 16px;
	}
`;

const HeadingTitle = styled.span`
	${headingTitle};
`;

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
