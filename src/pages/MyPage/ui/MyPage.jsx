import React, { useEffect, useState } from "react";
import getIdols from "@/shared/api/idols";
import IdolCard from "@/shared/ui/IdolCard/IdolCard";
import "./MyPage.css";

// 이미지
import logoImg from "../../../shared/assets/icons/logo.svg";
import myLogo from "../../../shared/assets/icons/my_logo.svg";
import leftArrow from "../../../shared/assets/icons/left_arrow.svg";
import rightArrow from "../../../shared/assets/icons/right_arrow.svg";
import plusIcon from "../../../shared/assets/icons/Ic_plus_24px.svg";

const MyPage = () => {
	const [idols, setIdols] = useState([]);

	// 아이돌 목록 클릭 이벤트
	const handleIdolClick = (event) => {
		console.log(event.target);
	};

	// 아이돌 목록 불러오기
	const getIdolList = async () => {
		const lists = await getIdols();
		const { list } = lists;
		setIdols(list);
	};

	useEffect(() => {
		getIdolList();
	}, []);

	return (
		<Container>
			<Inner>
				<Header>
					<Box>
						<a href="#none" className="logo">
							{/* alt 속성은 이미지 엑박뜰 때 보이는 텍스트라서 알아보기 쉬운 문구로 하는 게 좋아요! */}
							<img src={logoImg} alt="FANDOM-K" />
						</a>
					</Box>

					<a href="#none">
						<img src={myLogo} alt="마이페이지" />
					</a>
				</Header>

				<Page>
					{/* 관심있는 아이돌 */}
					<IdolSection>
						<Title>내가 관심있는 아이돌</Title>
						<Box>{/* <IdolCard /> */}</Box>
					</IdolSection>

					<Hr />

					{/* 아이돌 목록 */}
					<IdolSection>
						<Title1>관심 있는 아이돌을 추가해보세요.</Title1>

						<CarouselContainer>
							<Arrow>
								<img src={leftArrow} alt="line" />
							</Arrow>
							<IdolList>
								{idols?.map((idol) => {
									return (
										<IdolCard
											key={idol.id}
											info={idol}
											padding="6.48"
											onClick={handleIdolClick}
										/>
									);
								})}
							</IdolList>
							<Arrow>
								<img src={rightArrow} alt="line" />
							</Arrow>
						</CarouselContainer>
					</IdolSection>

					<Button>
						<Icon>
							<img src={plusIcon} alt="+" />
						</Icon>
						<Span>추가하기</Span>
					</Button>
				</Page>
			</Inner>
		</Container>
	);
};

//StyledComponents
import styled from "styled-components";

//레이아웃
const Container = styled.container`
	background-color: #02000e;
	min-height: 100vh;
`;

//inner
const Inner = styled.inner`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 24px;
	box-sizing: content-box;
`;

//헤더
const Header = styled.header`
	padding: 23px 0;
	display: flex;
	align-items: center;
`;

//아이돌 목록 슬라이드 영역, 미디어쿼리 _carousel-container
const CarouselContainer = styled.carousel`
	display: flex;
	align-items: center;
	width: calc(100% + 126px);
	margin-left: -63px;
	max-width: calc(100vw - 48px);
	@media screen and (max-width: 1374px) {
		width: 100%;
		margin-left: 0;
	}
`;

//마이페이지
const Page = styled.MyPage`
	padding: 75px 0 80px;
	display: grid;
	gap: 40px;
`;

//arrow
const Arrow = styled.Arrow`
	min-width: 29px;
	height: 135px;
	border-radius: 4px;
	background-color: #1b1b1b;
	opacity: 0.8;
	border: 0;
`;

//추가하기 버튼
const Button = styled.add`
	padding: 11px 83px;
	margin: 0 auto;
	border-radius: 24px;
	border: none;
	color: white;
	background: ${({ theme }) => theme.colors.brand[0]};
	font-size: 16px;
	font-weight: 700;
	line-height: 1.6;
	display: flex;
	align-items: center;
	gap: 8px;
`;
//추가하기 버튼의 +아이콘
const Icon = styled.icon`
	width: 24px;
	height: 24px;
`;
//추가하기 버튼의 span
const Span = styled.spans`
	font-weight: 700;
`;

//logo-box
const Box = styled.idol`
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
`;

//hr
const Hr = styled.hr`
	border: 1px solid rgba(255, 255, 255, 0.1);
`;

//idol-section
const IdolSection = styled.idol`
	display: grid;
	gap: 32px;
`;

//idol-list ,미디어쿼리 idol-list
const IdolList = styled.idol`
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	grid-template-columns: repeat(8, 1fr);
	padding: 0 34px;
	gap: 31px 22px;
	@media {
		padding: 0 27px;
		gap: 24px;
		grid-template-columns: repeat(6, 1fr);
	}
`;

export default MyPage;
