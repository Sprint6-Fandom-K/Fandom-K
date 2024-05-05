import { useMemo, useState } from "react";

import { FlexContainer } from "@/shared/ui/Container";

import SortChart from "@/features/SortChart";
import SelectGender from "@/features/SelectGender";
import CreateVoteModal from "@/features/VoteIdols";

export default function MonthChart() {
	const [gender, setGender] = useState("female");

	const isFemale = useMemo(() => gender === "male", [gender]);

	return (
		<FlexContainer $fd="column" $gap="24px">
			<CreateVoteModal gender={gender} />
			<SelectGender onChange={setGender} gender={gender} isfemale={isFemale} />
			<SortChart gender="male" isfemale={!isFemale} />
			<SortChart gender="female" isfemale={isFemale} />
		</FlexContainer>
	);
}
