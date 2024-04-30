import {
	MainContainer,
	MainContentContainer,
} from "@/shared/Container/Container";
import { MonthChart } from "@/widget/MonthChart";

export function ListPage() {
	return (
		// 이미지도 하나 넣어야 함 img_top design
		// header
		<MainContainer>
			<MainContentContainer>
				{/* 크레딧 widget */}
				{/* 조공 widget */}
				<MonthChart />
			</MainContentContainer>
		</MainContainer>
	);
}
