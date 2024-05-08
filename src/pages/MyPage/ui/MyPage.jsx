import React, { createContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import styled from "styled-components";

import getIdols from "@/shared/api/idols";
import IdolCard from "@/shared/ui/IdolCard/IdolCard";

// 이미지
import logoImg from "../../../shared/assets/icons/logo.svg";
import myLogo from "../../../shared/assets/icons/my_logo.svg";
import leftArrow from "../../../shared/assets/icons/left_arrow.svg";
import rightArrow from "../../../shared/assets/icons/right_arrow.svg";
import plusIcon from "../../../shared/assets/icons/Ic_plus_24px.svg";
import IdolListCardSkeleton from "@/entities/card/skeletons/IdolListCardSkeleton";

const LOCAL_STORAGE_KEY = "interest";

// 관심있는 아이돌 state 초기값 세팅
const getLocalStorage = () => {
	const list = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));
	return list && list.length > 0 ? list : [];
};

export const SelectContext = createContext();

const MyPage = () => {
	//state
	const [swiperRef, setSwiperRef] = useState(null);
	const [swiperIndex, setSwiperIndex] = useState(0);
	const [nextCursor, setNextCursor] = useState(0);
	const [idolPageData, setIdolPageData] = useState([]); // swiper 돌릴 데이터
	const [interestIdols, setInterestIdols] = useState(getLocalStorage()); // 관심있는 아이돌 목록 state
	const [localStorageData, setLocalStorageData] = useState(getLocalStorage()); // localStorage 데이터
	const [isAddingMode, setIsAddingMode] = useState(true); // 추가하기 모드 상태
	const [isLoading, setIsLoading] = useState(false);

	// 관심있는 아이돌 localStorage 업데이트
	const setLocalStorage = (data) => {
		const string = JSON.stringify(data);
		window.localStorage.setItem(LOCAL_STORAGE_KEY, string);
		setLocalStorageData(() => getLocalStorage());
		setIsAddingMode(false); // 추가하기 모드 해제
	};

	// 아이돌 목록에서 체크하면 관심있는 아이돌 state 업데이트
	const handleClickIdolList = (target) => {
		// localStorage에 저장된 데이터
		setIsAddingMode(true);

		setInterestIdols((prev) => {
			if (!prev.some((item) => item.id === target.id)) {
				// target 추가
				return [...prev, target];
			} else if (localStorageData.some((data) => data.id === target.id)) {
				// localStorage에 등록되어있는 target 선택한 경우
				return prev;
			} else {
				// target을 선택했다가 선택해제한 경우
				const deleteList = prev.filter((item) => item.id !== target.id);
				return deleteList;
			}
		});
	};

	// 관심있는 아이돌 삭제 함수
	const deleteIdol = (idol) => {
		const LocalStorageData = getLocalStorage();
		const updateData = LocalStorageData.filter((data) => data.id !== idol.id);
		setInterestIdols(updateData);
		setLocalStorage(updateData);
	};

	// 아이돌 목록 불러오기
	const getIdolList = async () => {
		const list = await getIdols();
		const nextCursor = list.nextCursor;

		const secondList = await getIdols(16, nextCursor);

		setNextCursor(secondList.nextCursor);
		setIdolPageData([list, secondList]);
	};

	// 스와이퍼 이전 페이지 불러오기
	const prevPageData = () => {
		setNextCursor(true);

		if (swiperRef) {
			swiperRef.slidePrev();
		}
	};

	// swiper change - api 불러오기, 다음 페이지 이동
	const handleSlideChange = async (swiper) => {
		const currentIndex = swiper.activeIndex;
		const totalSlides = swiper.slides.length;
		console.log(currentIndex, "current", totalSlides, "total");

		try {
			// setIsLoading(false);
			console.log(1);

			if (currentIndex === totalSlides - 1) {
				const prevCursor = idolPageData[idolPageData.length - 1].nextCursor;

				if (!prevCursor) {
					setNextCursor(null);
					// setIsLoading(false);
					console.log(2);
				} else {
					const lists = await getIdols(16, prevCursor);
					const nextCursor = lists.nextCursor;

					setNextCursor((prev) => prev);
					console.log(3);

					// setIsLoading(false);
					setIdolPageData((prev) => {
						return [...prev, lists];
					});
				}
			} else {
				const currentCursor = idolPageData[currentIndex].nextCursor;
				setNextCursor(currentCursor);
			}
		} catch (error) {
			console.error("Error fetching idols:", error);
			console.log(4);
			// setIsLoading(true);
		}
	};

	useEffect(() => {
		getIdolList();
	}, []);

	return (
		<Container>
			<Inner>
				<Header>
					<Box>
						<Link to="/">
							<img src={logoImg} alt="FANDOM-K" />
						</Link>
					</Box>

					<Link href="/mypage">
						<img src={myLogo} alt="마이페이지" />
					</Link>
				</Header>
				<SelectContext.Provider value={isAddingMode}>
					<Page>
						{/* 관심있는 아이돌 */}
						<IdolSection>
							<Title>내가 관심있는 아이돌</Title>
							<Swiper slidesPerView={10} slidesPerGroup={5} spaceBetween={24}>
								{localStorageData.map((idol) => {
									return (
										<SwiperSlide key={idol.id}>
											<IdolCard
												info={idol}
												padding="7.14"
												width="98"
												remove={true}
												deleteIdol={() => deleteIdol(idol)}
											/>
										</SwiperSlide>
									);
								})}
							</Swiper>
						</IdolSection>

						<Hr />

						{/* 아이돌 목록 */}
						<IdolSection>
							<Title>관심 있는 아이돌을 추가해보세요.</Title>

							<SwiperContainer>
								<Swiper
									slidesPerView={1}
									spaceBetween={22}
									observer
									observeParents
									onSwiper={(swiper) => {
										setSwiperRef(swiper);
										setSwiperIndex(swiper.activeIndex);
									}}
									onSlideChange={(swiper) => {
										setSwiperIndex(swiper.activeIndex);
										handleSlideChange(swiper);
									}}
									navigation={{
										prevEl: ".swiper-button-prev",
										nextEl: ".swiper-button-next",
									}}
									modules={[Navigation]}
								>
									{idolPageData.length === 0 || isLoading ? (
										<SwiperSlide>
											<IdolListCardSkeleton />
										</SwiperSlide>
									) : (
										idolPageData.map((slideData, slideIndex) => {
											return (
												<SwiperSlide key={slideIndex}>
													<IdolList>
														{slideData.list.map((idol) => {
															return (
																<IdolCard
																	key={idol.id}
																	info={idol}
																	padding="6.48"
																	chooseIdol={() => handleClickIdolList(idol)}
																/>
															);
														})}
													</IdolList>
												</SwiperSlide>
											);
										})
									)}
								</Swiper>
								{Boolean(swiperIndex) && (
									<LeftArrow
										className="swiper-button-prev"
										onClick={prevPageData}
									>
										<img src={leftArrow} alt="이전" />
									</LeftArrow>
								)}
								{nextCursor && (
									<RightArrow
										className="swiper-button-next"
										onClick={() => swiperRef.slideNext()}
										// onClick={nextPageData}
									>
										<img src={rightArrow} alt="다음" />
									</RightArrow>
								)}
							</SwiperContainer>
						</IdolSection>

						<Button onClick={() => setLocalStorage(interestIdols)}>
							<Icon>
								<img src={plusIcon} alt="+" />
							</Icon>
							<Span>추가하기</Span>
						</Button>
					</Page>
				</SelectContext.Provider>
			</Inner>
		</Container>
	);
};

//레이아웃
const Container = styled.div`
	color: var(--black1);
	min-height: 100vh;
`;

//inner
const Inner = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 24px;
	box-sizing: content-box;
	background-color: #02000e;
`;

//헤더
const Header = styled.header`
	padding: 23px 0;
	display: flex;
	align-items: center;
`;

//아이돌 목록 슬라이드 영역, 미디어쿼리 _carousel-container
const SwiperContainer = styled.div`
	position: relative;
	width: 100%;

	@media only screen and (max-width: 1370px) {
		display: flex;
	}
`;

//마이페이지
const Page = styled.div`
	padding: 75px 0 80px;
`;

//arrow
const Arrow = styled.button`
	position: absolute;
	top: 50%;
	z-index: 10;
	min-width: 29px;
	height: 135px;
	border-radius: 4px;
	opacity: 0.8;
	border: 0;
	background-color: var(--black3);
	transform: translateY(-50%);

	@media only screen and (max-width: 1370px) {
	}
`;

const LeftArrow = styled(Arrow)`
	left: -61px;

	&::after {
		content: "";
	}

	@media only screen and (max-width: 1370px) {
		left: 0;
	}
`;

const RightArrow = styled(Arrow)`
	right: -61px;

	&::after {
		content: "";
	}

	@media only screen and (max-width: 1370px) {
		right: 0;
	}
`;

//추가하기 버튼
const Button = styled.button`
	padding: 11px 83px;
	margin: 40px auto 0;
	border-radius: 24px;
	border: none;
	color: white;
	font-size: 16px;
	font-weight: 700;
	line-height: 1.6;
	display: flex;
	align-items: center;
	gap: 8px;
	background: linear-gradient(to right, #f77063, #fe5790);
`;

//추가하기 버튼의 +아이콘
const Icon = styled.div`
	width: 24px;
	height: 24px;
`;

//추가하기 버튼의 span
const Span = styled.span`
	font-weight: 700;
`;

//logo-box
const Box = styled.div`
	flex: 1;
	margin-left: 32px;
	text-align: center;
`;

//h1
const Title = styled.h1`
	color: #f6f6f8;
	font-weight: 700;
	font-size: 24px;
	line-height: 1.08;
	margin-bottom: 32px;
`;

//hr
const Hr = styled.hr`
	border: 1px solid rgba(255, 255, 255, 0.1);
	margin: 40px 0;
`;

//idol-section
const IdolSection = styled.section`
	/* margin-bottom: 40px; */
	/* display: grid;
	gap: 32px; */
`;

//idol-list ,미디어쿼리 idol-list
const IdolList = styled.div`
	width: 100%;
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	grid-template-columns: repeat(8, 1fr);
	/* padding: 0 34px; */
	gap: 31px 22px;
	@media only screen and (max-width: 1370px) {
		padding: 0 56px;
		gap: 24px;
		grid-template-columns: repeat(6, 1fr);
	}
`;

export default MyPage;
