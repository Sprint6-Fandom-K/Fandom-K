import PendingDonations from "@/widgets/PendingDonations";
import MonthChartList from "@/widgets/MonthChartList";
import SelectGender from "@/features/SelectGender";
import VoteModalButton from "@/features/VoteIdols";
import { useMemo, useState } from "react";

import ChargeCredit from "@/features/ChargeCredit/ChargeCredit";
import {
	ChartSection,
	PageBody,
	Content,
	PendingDonationsSection,
} from "./styled";
import Header from "@/widgets/Header";
import { Heading } from "@/shared/ui/Heading";

export default function ListPage() {
	const [gender, setGender] = useState("female");

	const isFemale = useMemo(() => gender === "female", [gender]);

	return (
		<PageBody>
			<Content>
				<Header />
				<ChargeCredit />
				<PendingDonationsSection>
					<Heading>
						<Heading.Title>후원을 기다리는 조공</Heading.Title>
					</Heading>
					<PendingDonations />
				</PendingDonationsSection>
				<ChartSection $fd="column" $gap="24px">
					<Heading>
						<Heading.Title>이달의 차트</Heading.Title>
						<VoteModalButton gender={gender} />
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
