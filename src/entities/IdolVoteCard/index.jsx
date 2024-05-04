import { FlexContainer, ImageContainer } from "@/shared/Container/Container";
import {
	chartItemDescription,
	chartItemIndex,
	chartItemName,
} from "@/shared/typo/typo";

import styled from "styled-components";

export const IdolVoteCardContainer = styled(FlexContainer)`
	border-bottom: 1px solid #ffffff1a;
	height: 86px;
`;

const VoteDescription = styled.span`
	${chartItemDescription}
`;

const VoteName = styled.span`
	${chartItemName}
`;

const VoteIndex = styled.span`
	${chartItemIndex}
`;

export default function IdolVoteCard({ item, index }) {
	const { group, name, profilePicture, totalVotes } = item;

	return (
		<IdolVoteCardContainer $jc="space-between" $ai="center">
			<FlexContainer $gap="12px" $ai="center">
				<ImageContainer src={profilePicture} />
				<VoteIndex>{index + 1}</VoteIndex>
				<FlexContainer $fd="column" $gap="4px">
					<VoteName>{`${group} ${name}`}</VoteName>
					<VoteDescription>{`${totalVotes}표`}</VoteDescription>
				</FlexContainer>
			</FlexContainer>
		</IdolVoteCardContainer>
	);
}
