import styled from 'styled-components';
import LogoImage from "@/shared/asset/HeaderLogo.svg";
import ContentImage1 from "@/shared/asset/MainContent_1.svg";
import ContentImage2 from "@/shared/asset/MainContent_2.svg";
import ContentImage3 from "@/shared/asset/MainContent_3.svg";
import HeaderBackgroundImage from "@/shared/asset/HeaderBackground.svg";
import MainBackgroundImage1 from "@/shared/asset/MainBackground_1.svg";
import MainBackgroundImage2 from "@/shared/asset/MainBackground_2.svg";
import MainBackgroundImage3 from "@/shared/asset/MainBackground_3.svg";

const Container = styled.div`
	box-sizing: border-box;
	background-color: #02000e;
`;

const Header = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	background-image: radial-gradient(50% 50% at 50% 50%, rgba(2, 0, 14, 0.01) 10%,#02000E 100%),url(${HeaderBackgroundImage});
	background-repeat: no-repeat;
	background-position: center;
	background-size: 932px 781px;

	@media only screen and (max-width: 744px){
		height: 1200px;
		background-size: 714px 598px;
	}

	@media only screen and (max-width: 375px){
		height: 812px;
		background-size: 394px 330px;
	}
`;

const Title = styled.div`
	margin-top: 140px;
	color: #fff;
	font-size: 26px;
	font-weight: 700;
	line-height: 31px;
	text-align: center;
	span { color: #f96d69;}

	@media only screen and (max-width: 744px){
		margin-top: 120px;
		font-size: 20px;
		line-height: 23px;
	}

	@media only screen and (max-width: 375px){
		margin-top: 100px;
		font-size: 20px;
		font-weight: 400;
	}
`;

const Logo = styled.img`
	margin-top: 29px;
	width: 509px;
	height: 97px;

	@media only screen and (max-width: 744px){
		margin-top: 32px;
		width: 325px;
		height: 62px;
	}

	@media only screen and (max-width: 375px){
		margin-top: 20px;
		width: 237px;
		height: 45px;
	}

`;

const Button = styled.button`
  margin-top: 584px;
	width: 477px;
  height: 48px;
	border: none;
	border-radius: 3px;
	background: linear-gradient(to left, #F86F65, #FE5493);
	color: #fff;
	font-size: 14px;
	font-weight: 700;
	cursor: pointer;

	@media only screen and (max-width: 744px){
		margin-top: 770px;
		width: 477px;
		height: 48px;
	}

	@media only screen and (max-width: 375px){
		margin-top: 450px;
		width: 230px;
		height: 48px;
	}
`;



const MainSectionContentImage = styled.img`
	@media only screen and (max-width: 744px){
		width: 200px;
		height: 434px;
	}

	@media only screen and (max-width: 375px){
		width: 240px;
		height: 520px;
	}
`;

const MainSectionContentTitle = styled.h1`
	padding-bottom: 8px;
	font-size: 16px;
	font-weight: 500;
	color: #d2c030;
	line-height: 19px;
`;

const MainSectionContentDescription = styled.p`
	padding-bottom: 58px;
	font-size: 24px;
	font-weight: 700;
	color: #fff;
	line-height: 29px;

	@media only screen and (max-width: 744px){
		padding-bottom: 47px;
		font-size: 20px;
	}
`;

const MainSectionContentTextWrapper = styled.div`
`;

const MainSectionContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const MainGradient = styled.div`
	width: 187px;
	height: 3019px;
	background: linear-gradient(180deg, #030615 0%, #051D31 42.67%, #051E32 53.12%, #051C30 74.27%, #030B1C 100%);
	margin: 0 auto;

	@media only screen and (max-width: 744px){
		width: 117px;
		height: 1800px;
	}
`;

const MaindSection = styled.div`
	padding: 160px 0 193px;
	height: 1200px;
	background-image:
	radial-gradient(50% 50% at 50% 50%, rgba(2, 0, 14, 0) 10%, rgba(2, 0, 14, 0.180099) 20%, rgba(2, 0, 14, 0.5) 20%, #02000E 100%),
	url(${props => props.imgURL});
	background-repeat: no-repeat;
	background-position: 50% 30%;
	background-size: 750px 750px;
	text-align: center;

	@media only screen and (max-width: 744px){
		padding: 74px 0 104px;
		height: 744px;
		background-size: 744px 744px;
	}

	@media only screen and (max-width: 375px){
		height: 812px;
		background-size: 500px 500px;
	}
`;

const Main = styled.div`

@media only screen and (max-width: 375px){
	${MaindSection}:nth-child(odd){
		${MainSectionContentTextWrapper}{
			padding-right:90px;
			text-align: start;
		}
	}

	${MaindSection}:nth-child(even){
		${MainSectionContentTextWrapper}{
			padding-left:90px;
			text-align:
			end;
		}
	}
}
`;


function LandingPage() {
	return (
		<Container>
			<Header>
				<Title>
					내가 좋아하는 아이돌을 <br></br>
					가장 <span>쉽게 덕질</span>하는 방법
				</Title>
				<Logo src={LogoImage} alt='로고이미지' />
				<Button>지금 시작하기</Button>
			</Header>
			<Main>
				<MaindSection imgURL={MainBackgroundImage1}>
					<MainSectionContent>
						<MainSectionContentTextWrapper>
							<MainSectionContentTitle>후원하기</MainSectionContentTitle>
							<MainSectionContentDescription>
								좋아하는 아이돌에게 <br></br>
								쉽게 조공해보세요
							</MainSectionContentDescription>
						</MainSectionContentTextWrapper>
						<MainSectionContentImage src={ContentImage1} alt='콘텐츠 이미지' />
						<MainGradient />
					</MainSectionContent>
				</MaindSection>
				<MaindSection imgURL={MainBackgroundImage2}>
					<MainSectionContent>
						<MainSectionContentTextWrapper>
							<MainSectionContentTitle>이달의 아티스트</MainSectionContentTitle>
							<MainSectionContentDescription>
								내 아티스트에게 1등의 <br></br>
								영예를 선물하세요
							</MainSectionContentDescription>
						</MainSectionContentTextWrapper>
						<MainSectionContentImage src={ContentImage2} alt='콘텐츠 이미지' />
					</MainSectionContent>
				</MaindSection>
				<MaindSection imgURL={MainBackgroundImage3}>
					<MainSectionContent>
						<MainSectionContentTextWrapper>
							<MainSectionContentTitle>나만의 아티스트</MainSectionContentTitle>
							<MainSectionContentDescription>
								좋아하는 아티스트들의 <br></br>
								소식을 모아보세요
							</MainSectionContentDescription>
						</MainSectionContentTextWrapper>
						<MainSectionContentImage src={ContentImage3} alt='콘텐츠 이미지' />
					</MainSectionContent>
				</MaindSection>
			</Main>
		</Container>
	);
}


export default LandingPage;
