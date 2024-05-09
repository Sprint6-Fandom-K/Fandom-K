import IdolVoteCard from "@/entities/card/ui/IdolVoteCard";
import IdolVoteCardSkeleton from "@/entities/card/skeletons/IdolVoteCardSkeleton";
import ModalHeader from "@/entities/header/ui/IdolVoteHeader";
import styled from "styled-components";
import backgroundBlueSomething from "@/shared/assets/images/backgroundBlueSomething.svg";
import { FlexContainer } from "@/shared/ui/Container";
import { PinkButton } from "@/shared/ui/Button";
import { modalDescription } from "@/shared/styles/typo";
import { CREDIT_FOR_ONE_VOTE } from "@/shared/constant/constant";
import { getCharts, postVotes } from "@/shared/api/api";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "@/app";
import useLocalStorage from "@/shared/hooks/useLocalStorage";
import useInfiniteScroll from "@/shared/hooks/useInfiniteScroll";
import { useGetData } from "@/shared/hooks/useGetData";

const VoteContainer = styled.form`
	background-color: var(--black2);
	color: white;
	width: 525px;
	height: 693px;
	border: none;
	overflow: auto;
	padding: 24px 24px 12px;
	border-radius: 12px;
	@media (width<=767px) {
		background-color: var(--black1);
		background-image: url(${backgroundBlueSomething});
		background-repeat: no-repeat;
		height: 100vh;
		width: 100vw;
		z-index: 2;
	}
`;

const VoteBottom = styled(FlexContainer)`
	display: flex;
	flex-direction: column;
	gap: 8px;
	@media (width<=767px) {
		background-color: #02000ecc;
		position: fixed;
		bottom: 0;
		gap: 12px;
		z-index: 1;
		padding: 16px 24px 14px;
		left: 0;
		right: 0;
		height: 106px;
	}
`;

const VoteButton = styled(PinkButton)``;

const ModalContentContainer = styled(FlexContainer)`
	height: 514px;
	position: relative;
	overflow: auto;
	@media (width<=767px) {
		padding-block: 43px 106px;
		flex: 1;
	}
`;

const VoteBottomDescription = styled.div`
	text-align: center;
	${modalDescription};
`;

const CreditHighLight = styled.span`
	color: var(--orange);
`;

export default function VoteIdol({ gender }) {
	const [id, setId] = useState(false);
	const [credit, setCredit] = useLocalStorage("credit", 0);
	const { items, ref, status } = useInfiniteScroll(getCharts, {
		gender,
	});
	const [fetchStatus, wrappedFunction] = useGetData(postVotes);
	let idolId;

	const handleClick = (e) => {
		if (!idolId) return;
		setCredit(credit - 1000);
		wrappedFunction(idolId);
	};

	useEffect(() => {
		if (id !== false) {
			idolId = id;
		}
	}, [id]);

	return (
		<>
			<VoteContainer>
				<FlexContainer $fd="column" $gap="20px">
					<ModalHeader gender={gender} onCancel={() => Modal.close()} />
					<ModalContentContainer $fd="column" $gap="8px">
						{items.map((v, index) => (
							<IdolVoteCard
								key={v.id}
								onClick={(e) => {
									setId(e.target.id);
								}}
								item={v}
								index={index}
								ref={ref}
							/>
						))}
						{status.isLoading &&
							Array.from(Array(10)).map((_, index) => (
								<IdolVoteCardSkeleton key={index} />
							))}
					</ModalContentContainer>
					<VoteBottom>
						<VoteButton height="42px" disabled={!id} onClick={handleClick}>
							투표하기
						</VoteButton>
						<VoteBottomDescription>
							투표하는 데{" "}
							<CreditHighLight>{CREDIT_FOR_ONE_VOTE}</CreditHighLight> 크레딧이
							소모됩니다.
						</VoteBottomDescription>
					</VoteBottom>
				</FlexContainer>
			</VoteContainer>
		</>
	);
}
