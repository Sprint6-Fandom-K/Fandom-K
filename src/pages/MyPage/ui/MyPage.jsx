import React, { createContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import styled, { css } from "styled-components";

import getIdols from "@/shared/api/idols";
import IdolCard from "@/shared/ui/IdolCard/IdolCard";
import IdolListCardSkeleton from "@/entities/card/skeletons/IdolListCardSkeleton";

// 이미지
import logoImg from "@/shared/assets/icons/logo.svg";
import myLogo from "@/shared/assets/icons/my_logo.svg";
import leftArrow from "@/shared/assets/icons/left_arrow.svg";
import rightArrow from "@/shared/assets/icons/right_arrow.svg";
import plusIcon from "@/shared/assets/icons/Ic_plus_24px.svg";

const LOCAL_STORAGE_KEY = "interest";

// 관심있는 아이돌 state 초기값 세팅
const getLocalStorage = () => {
	const list = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));
	return list && list.length > 0 ? list : [];
};

// 반응형 체크
const changeDataCount = (innerWidth) => {
	if (innerWidth < 481) {
		return 6;
	} else if (innerWidth < 745) {
		return 8;
	} else if (innerWidth < 1281) {
		return 12;
	} else {
		return 16;
	}
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
	const [isLoading, setIsLoading] = useState(true);
	const [dataCount, setDataCount] = useState(
		changeDataCount(window.innerWidth),
	);

	// 보이는 아이템 수 변경하는 함수
	const flattenArray = () => {
		if (idolPageData.length > 0) {
			const result = [];
			const newArr = idolPageData?.reduce((prev, next) => {
				return prev.concat(next.list);
			}, []);
			const page = Math.ceil(newArr.length / dataCount);
			for (let i = 0; i < page; i++) {
				const list = [];
				for (let j = 0; j < dataCount; j++) {
					if (newArr[dataCount * i + j]) {
						list.push(newArr[dataCount * i + j]);
					}
				}
				let nextCursor;
				if (list.length < dataCount) {
					nextCursor = null;
				} else {
					nextCursor = list[list.length - 1].id;
				}
				result.push({ list, nextCursor });
			}
			return result;
		}
	};

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
		try {
			const list = await getIdols(dataCount);
			const nextCursor = list.nextCursor;
			const secondList = await getIdols(dataCount, nextCursor);

			setNextCursor(secondList.nextCursor);
			setIdolPageData([list, secondList]);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching idols:", error);
		}
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

		try {
			if (currentIndex === totalSlides - 1) {
				// setIsLoading(true);
				const prevCursor = idolPageData[idolPageData.length - 1].nextCursor;

				if (!prevCursor) {
					setNextCursor(null);
				} else {
					const lists = await getIdols(dataCount, prevCursor);

					setNextCursor((prev) => prev);

					setIdolPageData((prev) => {
						return [...prev, lists];
					});
					// setIsLoading(false);
				}
			} else {
				const currentCursor = idolPageData[currentIndex].nextCursor;
				setNextCursor(currentCursor);
			}
		} catch (error) {
			console.error("Error fetching idols:", error);
		}
	};

	useEffect(() => {
		const data = flattenArray();
		let a = JSON.stringify(idolPageData);
		let b = JSON.stringify(data);

		if (data && a.split("").sort().join("") !== b.split("").sort().join("")) {
			setIdolPageData(data);
		}
	}, [idolPageData, dataCount]);

	useEffect(() => {
		getIdolList();
	}, [dataCount]);

	useEffect(() => {
		const event = (e) => {
			const showCount = changeDataCount(e.target.innerWidth);
			setDataCount(showCount);
		};

		window.addEventListener("resize", event);
		return () => {
			window.removeEventListener("resize", event);
		};
	}, []);

	return (
		<Container>
			<Inner>
				<Header>
					<Box></Box>
					<Box>
						<Link to="/">
							<Logo src={logoImg} alt="FANDOM-K" />
						</Link>
					</Box>

					<Box right="right">
						<Link href="/MyPage">
							<Logo src={myLogo} alt="마이페이지" />
						</Link>
					</Box>
				</Header>
				<SelectContext.Provider value={isAddingMode}>
					<Page>
						{/* 관심있는 아이돌 */}
						<IdolSection>
							<Title>내가 관심있는 아이돌</Title>
							<Swiper
								slidesPerView={10}
								slidesPerGroup={5}
								spaceBetween={24}
								observer={true}
								observeParents={true}
								observeSlideChildren={true}
							>
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
									observer={true}
									observeParents={true}
									observeSlideChildren={true}
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
											<IdolListCardSkeleton count={dataCount} />
										</SwiperSlide>
									) : (
										<>
											{idolPageData?.map((slideData, slideIndex) => {
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
											})}
											{isLoading ?? (
												<SwiperSlide>
													<IdolListCardSkeleton count={dataCount} />
												</SwiperSlide>
											)}
										</>
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


//넓이높이보단 패딩으로 맞추기. 744는 테블릿 . 테블릿부터 만지자
//레이아웃
const Container = styled.div`
	color: var(--black1);
	min-height: 100vh;

	/* tablet */
	@media only screen and (max-width: 744px) {
		height: 1133px;
	}

	/* mobile */
	@media only screen and (max-width: 375px){
		border-radius: 24px;
	}

`;

//inner
const Inner = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 24px;
	box-sizing: content-box;
	background-color: var(--black1);

	/* tablet */
	@media only screen and (max-width: 744px) {
		margin: 0 auto;
	}
`;

const Logo = styled.img`
    /* tablet */
    @media only screen and (max-width: 744px){
	height: 22.87px;
	}

    /* mobile */
	@media only screen and (max-width: 375px){
	height: 20.58px;
	margin-top: 62px;
    }
`;

//헤더
const Header = styled.header`
	padding: 23px 0;
	display: flex;
	align-items: center;
	background-repeat: no-repeat;
	background-position: center;

	/* tablet */
	@media only screen and (max-width: 744px) {
		margin: 0 auto;
	}




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

	@media only screen and (max-width: 744px) {
		padding: 15px 0 210px;
	}
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

	@media only screen and (max-width: 480px) {
		display: none;
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
	text-align: ${({ right }) => (right ? right : "center")};
	> a {
		display: inline-block;
	}
`;
//h1
const Title = styled.h1`
	color: #f6f6f8;
	font-weight: 700;
	font-size: 24px;
	line-height: 1.08;
	margin-bottom: 32px;

	@media only screen and (max-width: 744px) {
		font-size: 20px;
		margin-bottom: 25px;
		line-height: 1.3;
	}

	@media only screen and (max-width: 375px) {
		font-size: 16px;
		margin-bottom: 25px;
		line-height: 1.3;
	}
`;
//hr
const Hr = styled.hr`
	border: 1px solid rgba(255, 255, 255, 0.1);
	margin: 40px 0;

	@media only screen and (max-width: 744px) {
		margin: 33px 0;
	}
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
	@media only screen and (max-width: 1280px) {
		padding: 0 56px;
		gap: 24px;
		grid-template-columns: repeat(6, 1fr);
	}
	@media only screen and (max-width: 744px) {
		grid-template-columns: repeat(4, 1fr);
	}
	@media only screen and (max-width: 480px) {
		padding: 0;
		gap: 17px 24px;
		grid-template-columns: repeat(3, 1fr);
	}
`;

export default MyPage;
