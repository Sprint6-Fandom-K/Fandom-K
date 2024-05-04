import { FlexContainer, ImageContainer } from "@/shared/Container/Container";

import {
	chartItemDescription,
	chartItemIndex,
	chartItemName,
} from "@/shared/typo/typo";
import styled from "styled-components";

export const IdolChartCardContainer = styled(FlexContainer)`
	border-bottom: 1px solid #ffffff1a;
	height: 85px;
`;

const ChartItemDescription = styled.span`
	${chartItemDescription}
`;

const ChartItemName = styled.span`
	${chartItemName}
`;

const ChartItemIndex = styled.span`
	${chartItemIndex}
`;

export default function IdolChartCard({ item, index }) {
	const { group, name, profilePicture, totalVotes } = item;
	return (
		<IdolChartCardContainer $jc="space-between" $ai="center">
			<FlexContainer $gap="12px" $ai="center">
				<ImageContainer src={profilePicture} alt={`${name} 사진`} />
				<ChartItemIndex>{index + 1}</ChartItemIndex>
				<ChartItemName>{group}</ChartItemName>
				<ChartItemName>{name}</ChartItemName>
			</FlexContainer>
			<ChartItemDescription>{totalVotes + "표"}</ChartItemDescription>
		</IdolChartCardContainer>
	);
}
