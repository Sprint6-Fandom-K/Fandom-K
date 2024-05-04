import { FlexContainer } from "@/shared/Container/Container";
import skeletonStyle from "@/shared/skeleton/skeletonStyle";
import styled from "styled-components";
import { IdolVoteCardContainer } from ".";

const SkeletonImageContainer = styled.div`
	width: 70px;
	height: 70px;
	border-radius: 40px;
	${skeletonStyle};
`;

const SkeletonIndex = styled.div`
	width: 30px;
	height: 15px;
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
	width: 16px;
	height: 15px;
	border-radius: 10px;
	${skeletonStyle};
`;

export default function IdolVoteCardSkeleton() {
	return (
		<IdolVoteCardContainer $jc="space-between" $ai="center">
			<FlexContainer $gap="12px" $ai="center">
				<SkeletonImageContainer />
				<SkeletonIndex />
				<FlexContainer $fd="column" $gap="4px">
					<SkeletonNameBlock />
					<SkeletonNameBlock />
				</FlexContainer>
			</FlexContainer>
			<SkeletonVoteBlock />
		</IdolVoteCardContainer>
	);
}
