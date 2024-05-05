import { MainContainer, MainContentContainer } from "@/shared/ui/Container";
import MonthChart from "@/widgets/MonthChart";

export default function ListPage() {
	return (
		<MainContainer>
			<MainContentContainer>
				{/* 크레딧 widget */}
				{/* 조공 widget */}
				<MonthChart />
			</MainContentContainer>
		</MainContainer>
	);
}
