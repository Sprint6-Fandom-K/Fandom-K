import { FlexContainer, ImageContainer } from "@/shared/Container/Container";
import skeletonStyle from "@/shared/skeleton/skeletonStyle";

import {
	chartItemDescription,
	chartItemIndex,
	chartItemName,
} from "@/shared/typo/typo";
import styled from "styled-components";

const NewFlexContainer = styled(FlexContainer)`
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

const SkeletonImageContainer = styled.div`
	width: 70px;
	height: 70px;
	border-radius: 40px;
	${skeletonStyle};
`;

const SkeletonNameBlock = styled.div`
	width: 120px;
	height: 15px;
	border-radius: 10px;
	${skeletonStyle};
`;

const SkeletonVoteBlock = styled.div`
	width: 60px;
	height: 15px;
	border-radius: 10px;
	${skeletonStyle};
`;

export default function IdolChartCard({ item, index }) {
	const { group, name, profilePicture, totalVotes } = item;
	return (
		<NewFlexContainer $jc="space-between" $ai="center">
			<FlexContainer $gap="12px" $ai="center">
				<ImageContainer src={profilePicture} alt={`${name} 사진`} />
				<ChartItemIndex>{index + 1}</ChartItemIndex>
				<ChartItemName>{group}</ChartItemName>
				<ChartItemName>{name}</ChartItemName>
			</FlexContainer>
			<ChartItemDescription>{totalVotes + "표"}</ChartItemDescription>
		</NewFlexContainer>
	);
}

export function IdolChartCardSkeleton() {
	return (
		<NewFlexContainer $jc="space-between" $ai="center">
			<FlexContainer $gap="12px" $ai="center">
				<SkeletonImageContainer />
				<SkeletonNameBlock />
			</FlexContainer>
			<SkeletonVoteBlock />
		</NewFlexContainer>
	);
}
