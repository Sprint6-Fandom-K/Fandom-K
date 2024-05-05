import { FlexContainer, ImageContainer } from "@/shared/ui/Container";
import {
	chartItemDescription,
	chartItemIndex,
	chartItemName,
} from "@/shared/styles/typo";

import styled from "styled-components";
import { formatNumber } from "@/shared/utils/format";

export const IdolVoteCardContainer = styled(FlexContainer)`
	border-bottom: 1px solid #ffffff1a;
	height: 86px;
	&:has(input:checked) {
		background-color: #ffffff1a;
	}
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

const Input = styled.input`
	appearance: none;
`;

export default function IdolVoteCard({ item, index, onSelect }) {
	const { group, name, profilePicture, totalVotes } = item;

	const handleChange = (e) => {
		onSelect(e.target.id);
	};
	return (
		<IdolVoteCardContainer
			as="label"
			htmlFor={item.id}
			$jc="space-between"
			$ai="center"
		>
			<FlexContainer $gap="12px" $ai="center">
				<ImageContainer src={profilePicture} />
				<VoteIndex>{index + 1}</VoteIndex>
				<FlexContainer $fd="column" $gap="4px">
					<VoteName>{`${group} ${name}`}</VoteName>
					<VoteDescription>{`${formatNumber(totalVotes)}표`}</VoteDescription>
				</FlexContainer>
			</FlexContainer>
			<Input type="radio" id={item.id} name="vote" onChange={handleChange} />
		</IdolVoteCardContainer>
	);
}
