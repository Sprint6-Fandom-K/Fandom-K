import { FlexContainer } from "@/shared/Container/Container";
import { NewFlexContainer } from ".";
import skeletonStyle from "@/shared/skeleton/skeletonStyle";
import styled from "styled-components";

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

export default function IdolVoteCardSkeleton() {
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
