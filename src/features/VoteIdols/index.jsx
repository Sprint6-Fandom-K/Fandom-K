import IdolVoteCard from "@/entities/IdolVoteCard";
import IdolVoteCardSkeleton from "@/entities/IdolVoteCard/IdolVoteCardSkeleton";
import ModalHeader from "@/entities/IdolVoteHeader";
import styled from "styled-components";

import backgroundBlueSomething from "@/shared/assets/images/backgroundBlueSomething.svg";
import { FlexContainer } from "@/shared/Container/Container";
import { PinkButton } from "@/shared/Button";
import { modalDescription } from "@/shared/typo/typo";
import { CREDIT_FOR_ONE_VOTE } from "@/shared/constant/constant";
import { useGetData } from "@/shared/hooks/useGetData";
import { getCharts } from "@/shared/api/api";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import refresh from "@/shared/assets/icons/icons8-refresh-30.png";

const BackDrop = styled.div`
	background-color: rgba(0, 0, 0, 0.6);
	position: absolute;
	inset: 0;
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (width<=767px) {
		background-color: #02000e;
	}
`;

const Modal = styled.dialog`
	background-color: #181d26;
	color: white;
	width: 525px;
	height: 693px;
	border: none;
	overflow: auto;
	padding: 24px 24px 12px;
	border-radius: 12px;
	@media (width<=767px) {
		background-color: inherit;
		background-image: url(${backgroundBlueSomething});
		background-repeat: no-repeat;
		height: 100%;
		width: 100%;
		z-index: 2;
	}
`;

const VoteButton = styled(PinkButton)`
	@media (width<=767px) {
		position: relative;
		left: 0;
		right: 0;
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

const ModalContentContainer = styled(FlexContainer)`
	height: 514px;
	position: relative;
	overflow: auto;
	@media (width<=767px) {
		margin-top: 67px;
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

const RefreshSection = styled.div`
	height: 78px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default function ({ onCancel, gender }) {
	const [status, wrappedFunction] = useGetData(getCharts);
	const [cursor, setCursor] = useState(0);
	const [items, setItems] = useState([]);
	const [pageLimit, setPageLimit] = useState(10);
	const lastCardRef = useRef(null);

	const isNoMoreItems = cursor === null && pageLimit >= items.length;

	const { ref, inView } = useInView({
		threshold: 1,
		root: lastCardRef.current,
	});

	useEffect(() => {
		async function executeRefresh() {
			const { idols, nextCursor } = await wrappedFunction({
				gender,
				cursor,
			});
			console.log(cursor);
			if (!idols) return;
			setCursor(nextCursor);
			setItems([...items, ...idols]);
			setPageLimit(pageLimit + 10);
		}
		if (inView) executeRefresh();
		return () => (executeRefresh = null);
	}, [inView]);

	return (
		<>
			<BackDrop>
				<Modal open aria-modal="true" aria-labelledby="voteModal">
					<FlexContainer $fd="column" $gap="20px">
						<ModalHeader gender={gender} onCancel={onCancel} />
						<ModalContentContainer $fd="column" $gap="8px">
							{items.map((v, index) => (
								<IdolVoteCard key={v.id} item={v} index={index} />
							))}
							{((!status.isLoading && !isNoMoreItems) ||
								items.length === 0) && (
								<RefreshSection ref={ref}>
									<img src={refresh} />
								</RefreshSection>
							)}
							{status.isLoading &&
								Array.from(Array(10)).map((_, index) => (
									<IdolVoteCardSkeleton key={index} />
								))}
						</ModalContentContainer>
						<VoteBottom>
							<VoteButton width="auto" height="42px">
								투표하기
							</VoteButton>
							<VoteBottomDescription>
								투표하는 데{" "}
								<CreditHighLight>{CREDIT_FOR_ONE_VOTE}</CreditHighLight>{" "}
								크레딧이 소모됩니다.
							</VoteBottomDescription>
						</VoteBottom>
					</FlexContainer>
				</Modal>
			</BackDrop>
		</>
	);
}
