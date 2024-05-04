import { FlexContainer } from "@/shared/Container/Container";
import skeletonStyle from "@/shared/skeleton/skeletonStyle";
import styled from "styled-components";
import { IdolChartCardContainer } from ".";

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

export default function IdolChartCardSkeleton() {
	return (
		<IdolChartCardContainer $jc="space-between" $ai="center">
			<FlexContainer $gap="12px" $ai="center">
				<SkeletonImageContainer />
				<SkeletonNameBlock />
			</FlexContainer>
			<SkeletonVoteBlock />
		</IdolChartCardContainer>
	);
}
