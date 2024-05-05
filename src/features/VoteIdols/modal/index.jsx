import IdolVoteCard from "@/entities/card/ui/IdolVoteCard";
import IdolVoteCardSkeleton from "@/entities/card/skeletons/IdolVoteCardSkeleton";
import ModalHeader from "@/entities/header/ui/IdolVoteHeader";
import styled from "styled-components";
import backgroundBlueSomething from "@/shared/assets/images/backgroundBlueSomething.svg";
import { FlexContainer } from "@/shared/ui/Container";
import { PinkButton } from "@/shared/ui/Button";
import { modalDescription } from "@/shared/styles/typo";
import { CREDIT_FOR_ONE_VOTE } from "@/shared/constant/constant";
import { useGetData } from "@/shared/hooks/useGetData";
import { getCharts } from "@/shared/api/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import RefreshIcon from "@/shared/assets/icons/RefreshIcon";
import { rotate } from "@/shared/styles/keyframes";

const BackDrop = styled.div`
	background-color: rgba(0, 0, 0, 0.6);
	position: fixed;
	inset: 0;
	z-index: 1;
`;

const RotateIcon = styled(RefreshIcon)`
	animation: ${rotate} 2s ease-in-out infinite;
`;

const Modal = styled.form`
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
		height: 100%;
		width: 100%;
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
	const [cursor, setCursor] = useState(0);
	const [items, setItems] = useState([]);
	const [pageLimit, setPageLimit] = useState(10);
	const [select, setSelect] = useState(false);
	const lastCardRef = useRef(null);
	const isNoMoreItems = useMemo(
		() => cursor === null && pageLimit >= items.length,
		[cursor, pageLimit, items],
	);
	const handleSubmit = useCallback((e) => {
		e.preventDefault();
	}, []);

	const [status, wrappedFunction] = useGetData(getCharts);
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
			if (!idols) return;
			setCursor(nextCursor);
			setItems([...items, ...idols]);
			setPageLimit(pageLimit + 10);
		}
		if (inView) {
			executeRefresh();
		} else if (items.length === 0) {
			executeRefresh();
		}
		return () => (executeRefresh = null);
	}, [inView]);

	return (
		<>
			<BackDrop>
				<Modal
					aria-modal="true"
					aria-labelledby="voteModal"
					onSubmit={handleSubmit}
				>
					<FlexContainer $fd="column" $gap="20px">
						<ModalHeader gender={gender} onCancel={onCancel} />
						<ModalContentContainer $fd="column" $gap="8px">
							{items.map((v, index) => (
								<IdolVoteCard
									key={v.id}
									item={v}
									index={index}
									onSelect={setSelect}
								/>
							))}
							{status.isLoading &&
								Array.from(Array(10)).map((_, index) => (
									<IdolVoteCardSkeleton key={index} />
								))}
							{!status.isLoading && !isNoMoreItems ? (
								<RefreshSection ref={ref}>
									<RotateIcon />
								</RefreshSection>
							) : (
								<RefreshSection></RefreshSection>
							)}
						</ModalContentContainer>
						<VoteBottom>
							<PinkButton type="submit" height="42px" disabled={!select}>
								투표하기
							</PinkButton>
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
