import PendingDonations from "@/widgets/PendingDonations";
import SortChart from "@/widgets/SortChart";
import SelectGender from "@/features/SelectGender";
import CreateVoteModal from "@/features/VoteIdols";
import { useMemo, useState } from "react";

import { FlexContainer } from "@/shared/ui/Container";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ChargeCredit from "@/features/ChargeCredit/ChargeCredit";

const MainContainer = styled.main`
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

const MainContentContainer = styled.div`
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

export default function ListPage() {
	const [gender, setGender] = useState("female");

	const isFemale = useMemo(() => gender === "female", [gender]);

	return (
		<MainContainer>
			<MainContentContainer>
				<Link style={{ fontSize: 100 }} to="/mypage">
					헤더
				</Link>
				<ChargeCredit />
				<PendingDonationsSection>
					<PendingDonations />
				</PendingDonationsSection>
				<ChartSection $fd="column" $gap="24px">
					<CreateVoteModal gender={gender} />
					<SelectGender
						onChange={setGender}
						gender={gender}
						isActive={isFemale}
					/>
					<SortChart gender="female" isactive={isFemale} />
					<SortChart gender="male" isactive={!isFemale} />
				</ChartSection>
			</MainContentContainer>
		</MainContainer>
	);
}
