import { MainContainer, MainContentContainer } from "@/shared/ui/Container";
import PendingDonations from "@/widgets/PendingDonations";
import SortChart from "@/widgets/SortChart";
import SelectGender from "@/features/SelectGender";
import CreateVoteModal from "@/features/VoteIdols";
import { useMemo, useState } from "react";

import { FlexContainer } from "@/shared/ui/Container";
import { Link } from "react-router-dom";

export default function ListPage() {
	const [gender, setGender] = useState("female");

	const isFemale = useMemo(() => gender === "female", [gender]);

	return (
		<MainContainer>
			<MainContentContainer>
				<Link style={{ fontSize: 100 }} to="/mypage">
					마이 페이지
				</Link>
				{/* 크레딧 widget */}
				<PendingDonations></PendingDonations>
				<FlexContainer $fd="column" $gap="24px">
					<CreateVoteModal gender={gender} />
					<SelectGender
						onChange={setGender}
						gender={gender}
						isActive={isFemale}
					/>
					<SortChart gender="female" isactive={isFemale} />
					<SortChart gender="male" isactive={!isFemale} />
				</FlexContainer>
			</MainContentContainer>
		</MainContainer>
	);
}
