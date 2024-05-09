import { MainContainer, MainContentContainer } from "@/shared/ui/Container";
import MonthChart from "@/widgets/MonthChart";
import PendingDonations from "@/widgets/PendingDonations";

import { Link } from "react-router-dom";

export default function ListPage() {
	return (
		<MainContainer>
			<MainContentContainer>
				<Link style={{ fontSize: 100 }} to="/MyPage">마이 페이지</Link>
				{/* 크레딧 widget */}
				<PendingDonations></PendingDonations>
				<MonthChart />
			</MainContentContainer>
		</MainContainer>
	);
}
