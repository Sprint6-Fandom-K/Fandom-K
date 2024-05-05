import { MainContainer, MainContentContainer } from "@/shared/ui/Container";
import MonthChart from "@/widgets/MonthChart";
import PendingDonations from "@/widgets/PendingDonations";

export default function ListPage() {
	return (
		<MainContainer>
			<MainContentContainer>
				{/* 크레딧 widget */}
				<PendingDonations></PendingDonations>
				<MonthChart />
			</MainContentContainer>
		</MainContainer>
	);
}
