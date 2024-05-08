import useLocalStorage from "@/shared/hooks/useLocalStorage";
import { MainContainer, MainContentContainer } from "@/shared/ui/Container";
import Header from "@/widgets/Header";
import MonthChart from "@/widgets/MonthChart";
import PendingDonations from "@/widgets/PendingDonations";

export default function ListPage() {
	const [credit, set_credit] = useLocalStorage("credit", 0);
	return (
		<MainContainer>
			<MainContentContainer>
				<div style={{ fontSize: 100, color: "white" }}>
					내 크래딧 {credit}
				</div>
				{/* 크레딧 widget */}
				<PendingDonations></PendingDonations>
				<MonthChart />
			</MainContentContainer>
		</MainContainer>
	);
}
