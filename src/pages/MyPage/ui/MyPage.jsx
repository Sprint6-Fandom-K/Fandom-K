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
						<IdolSection isInterest={false}>
							<Title isInterest={false}>관심 있는 아이돌을 추가해보세요.</Title>

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



//레이아웃
const Container = styled.div`
	color: var(--black1);
	width: 1920px;
	height: 1080px;

	/* tablet */
	@media only screen and (768px <= width < 1200px){
		height: 1133px;
	}
	/* mobile */
	@media only screen and (375px <= width < 768px){

		height: 812px;
		margin-top: 152px;
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
	height: 1080px;


	@media only screen and (768px <= width < 1200px){
		max-width: 696px;
		margin: 0 auto;
	}

	@media only screen and (375px <= width < 768px){
		width: 327px;
		margin: 0 auto;
		border-radius: 24px;
	}
`;


const Logo = styled.img`
    height: 32px;

    @media only screen and (768px <= width < 1200px){
	height: 22.87px;
	}

	@media only screen and (375px <= width < 768px){
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

    @media only screen and (768px <= width < 1200px){
		height: 81px;
		}

		@media only screen and (375px <= width < 768px){
		height: 88px;
		}
`;


//아이돌 목록 슬라이드 영역, 미디어쿼리 _carousel-container
const SwiperContainer = styled.div`
	position: relative;
	width: 100%;
	@media only screen and (max-width: 1370px) {
		display: flex;
	}

	@media only screen and (768px <= width < 1200px){
		max-width: 584px;
		height: 390px;
		gap: 24px;
		margin: 0 auto;
	}
`;

//마이페이지 _'내가 관심있는 아이돌' 부분
const Page = styled.div`
	padding: 75px 0 80px;
	display: grid;
	gap: 40px;

	@media only screen and (375px <= width < 768px){
		max-width: 404px;
		height: 123px;
		gap: 4px;
		margin-left:24px;
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

	@media only screen and (768px <= width < 1200px){
		display: block;
	}

	@media only screen and (375px <= width < 768px){
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
	background: var(--brand);

    @media only screen and (768px <= width < 1200px){
		height: 48px;
		margin: 0 auto;
	}
	@media only screen and (375px <= width < 768px){
		height: 48px;
/*아이돌카드변경되면 위치 내려갈 것, 안내려갈수도있으니 확인. 마진적용하면 됨 */
		margin-top: 24px;
		margin-left: 20px;
	}
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
	text-align: ${({ right }) => (right ? right : "center")};

	> a {
		display: inline-block;
	}
`;

//h1
const Title = styled.h1`
	color: var(--white3);
	font-weight: 700;
	font-size: 24px;
	line-height: 1.08;
	margin-bottom: 32px;

	@media only screen and (768px <= width < 1200px){
		font-size: 20px;

	}

	${({ isInterest }) => isInterest ? css`
	@media only screen and (375px <= width < 768px) {
		display: none;
	}
	` : css`

	@media only screen and (375px <= width < 768px) {
		font-size: 16px;

	}
	`}
`;

//hr 구분선
const Hr = styled.hr`
	border: 1px solid rgba(255, 255, 255, 0.1);
	margin: 40px 0;
	width: 1200px;

	@media only screen and (768px <= width < 1200px){
		border: 1px solid rgba(255, 255, 255, 0.1);
		width: 696px;
	}

	@media only screen and (375px <= width < 768px){
		border: 1px solid rgba(255, 255, 255, 0.1);
		width: 327px;
	}
`;

//idol-section 스와이퍼 있는 곳
const IdolSection = styled.section`
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
	/* 이 부분 은빈님 api작업하시면 반응형 fix
    /*테블릿 모바일에 따른 아이돌카드 행과 열 정열*/
		/* @media only screen and (768px <= width < 1200px){
		grid-template-rows: repeat(2, 1fr);
		grid-template-columns: repeat(8, 1fr);
	}

	@media only screen and (375px <= width < 768px){
		grid-template-rows: repeat(2, 1fr);
		grid-template-columns: repeat(3, 1fr);
		overflow-x: scroll;
	} */
	@media only screen and (max-width: 744px) {
		padding: 0 56px;
		gap: 24px;
		grid-template-columns: repeat(4, 1fr);
	}

	@media only screen and (max-width: 480px) {
		padding: 0 56px;
		gap: 24px;
		grid-template-columns: repeat(3, 1fr);
	}
`;

/*스와이퍼 들어가면서 삭제 InterestIdolList 부분에 SwiperSlide 들어감
//'내가 관심있는 아이돌' 동그란 카드 부분
const InterestIdolList = styled.ul`
	display: flex;
	overflow-x: scroll;
	gap: 22px;
//모바일부분만 카드 크기 작게 변화됨
	@media only screen and (375px <= width < 768px) {
		width: 70px
		heigh: 70px
		padding: 0 27px;
		gap: 24px;
		overflow-x: scroll;
	}
`;*/

export default MyPage;
