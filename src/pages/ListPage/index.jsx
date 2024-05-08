import PendingDonations from "@/widgets/PendingDonations";
import SortChart from "@/widgets/SortChart";
import SelectGender from "@/features/SelectGender";
import CreateVoteModal from "@/features/VoteIdols";
import { useMemo, useState } from "react";

import ChargeCredit from "@/features/ChargeCredit/ChargeCredit";
import {
	ChartSection,
	PageBody,
	Content,
	PendingDonationsSection,
} from "./styled";
import Header from "@/widgets/Header";

export default function ListPage() {
	const [gender, setGender] = useState("female");

	const isFemale = useMemo(() => gender === "female", [gender]);

	return (
		<PageBody>
			<Content>
				<Header />
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
			</Content>
		</PageBody>
	);
}
