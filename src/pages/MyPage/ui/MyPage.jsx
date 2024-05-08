import React, { createContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";

import getIdols from "@/shared/api/idols";
import IdolCard from "@/shared/ui/IdolCard/IdolCard";

// 이미지
import logoImg from "@/shared/assets/icons/logo.svg";
import myLogo from "@/shared/assets/icons/my_logo.svg";
import leftArrow from "@/shared/assets/icons/left_arrow.svg";
import rightArrow from "@/shared/assets/icons/right_arrow.svg";
import plusIcon from "@/shared/assets/icons/Ic_plus_24px.svg";
import { Link } from "react-router-dom";

const LOCAL_STORAGE_KEY = "interest";

// 관심있는 아이돌 state 초기값 세팅
const getLocalStorage = () => {
	const list = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));
	return list && list.length > 0 ? list : [];
};

export const SelectContext = createContext();

const MyPage = () => {
	const [idolList, setIdolList] = useState([]); // 아이돌 목록 state
	const [interestIdols, setInterestIdols] = useState(getLocalStorage()); // 관심있는 아이돌 목록 state
	const [localStorageData, setLocalStorageData] = useState(getLocalStorage()); // localStorage 데이터
	const [isAddingMode, setIsAddingMode] = useState(true); // 추가하기 모드 상태

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
		const lists = await getIdols();
		const { list } = lists;
		console.log(lists, "list");
		setIdolList(list);
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
							<Logo src={logoImg} alt="FANDOM-K" />
						</Link>
					</Box>

					<Link href="/MyPage">
						<Logo src={myLogo} alt="마이페이지" />
					</Link>
				</Header>

				<SelectContext.Provider value={isAddingMode}>
					<Page>
						{/* 관심있는 아이돌 */}
						<IdolSection>
							<Title isInterest={true}>내가 관심있는 아이돌</Title>
							<InterestIdolList>
								{localStorageData.map((idol) => {
									return (
										<IdolCard
											key={idol.id}
											info={idol}
											padding="7.14"
											width="98"
											remove={true}
											deleteIdol={() => deleteIdol(idol)}
										/>
									);
								})}
							</InterestIdolList>
						</IdolSection>

						<Hr />

						{/* 아이돌 목록 */}
						<IdolSection isInterest={false}>
							<Title isInterest={false}>관심 있는 아이돌을 추가해보세요.</Title>

							<CarouselContainer>
								<Arrow>
									<img src={leftArrow} alt="이전" />
								</Arrow>
								<IdolList>
									{idolList?.map((idol) => {
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
								<Arrow>
									<img src={rightArrow} alt="다음" />
								</Arrow>
							</CarouselContainer>
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

//구분선 관심있는아이돌과는 떨어진 상태
const Frame = styled.div`
    max-width: 1200px;
    height: 1px;

    @media only screen and (768px <= width < 1200px){
		max-width: 696px;
		height: 1px;
	}

	@media only screen and (375px <= width < 768px){
		max-width: 327px;
		height: 1px;
	}
`;


//아이돌 목록 슬라이드 영역, 미디어쿼리 _carousel-container
const CarouselContainer = styled.div`
	display: flex;
	align-items: center;
	width: calc(100% + 126px);
	margin: 0 auto;
	max-width: calc(100vw - 48px);

    @media only screen and (768px <= width < 1200px){
		max-width:: 584px;
		height: 390px;
		gap: 24px;
		margin: 0 auto;
	}

	@media only screen and (375px <= width < 768px){
		max-width: 328px;
		height: 326px;
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
	min-width: 29px;
	height: 135px;
	border-radius: 4px;
	opacity: 0.8;
	border: 0;
	background-color: var(--black3);

	@media only screen and (768px <= width < 1200px){
		display: block;
	}

	@media only screen and (375px <= width < 768px){
		display: none;
	}
`;


//추가하기 버튼
const Button = styled.button`
	padding: 11px 83px;
	margin: 0 auto;
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
`;

//h1
const Title = styled.h1`
	color: var(--white3);
	font-weight: 700;
	font-size: 24px;
	line-height: 1.08;

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

//idol-section
const IdolSection = styled.section`
	display: grid;
	gap: 32px;
`;




//idol-list ,미디어쿼리 idol-list '관심있는 아이돌을 추가해보세요' 동그란 카드 부분
const IdolList = styled.ul`
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	grid-template-columns: repeat(8, 1fr);
	padding: 0 34px;
	gap: 31px 22px;


	/* 이 부분 은빈님 api작업하시면 반응형 fix
    /*테블릿 모바일에 따른 아이돌카드 행과 열 정열*/
	@media only screen and (768px <= width < 1200px){
		grid-template-rows: repeat(2, 1fr);
		grid-template-columns: repeat(8, 1fr);
	}

	@media only screen and (375px <= width < 768px){
		grid-template-rows: repeat(2, 1fr);
		grid-template-columns: repeat(3, 1fr);
		overflow-x: scroll;
	}*/

	@media only screen and (max-width: 1374px) {
		padding: 0 27px;
		gap: 4px;
		grid-template-columns: repeat(4, 1fr);
	}
`;

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
`;

export default MyPage;
