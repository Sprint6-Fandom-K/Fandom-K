import styled from 'styled-components';
import LogoImage from "@/shared/assets/HeaderLogo.svg";
import ContentImage1 from "@/shared/assets/MainContent_1.svg";
import ContentImage2 from "@/shared/assets/MainContent_2.svg";
import ContentImage3 from "@/shared/assets/MainContent_3.svg";
import HeaderBackgroundImage from "@/shared/assets/HeaderBackground.svg";
import MainBackgroundImage1 from "@/shared/assets/MainBackground_1.svg";
import MainBackgroundImage2 from "@/shared/assets/MainBackground_2.svg";
import MainBackgroundImage3 from "@/shared/assets/MainBackground_3.svg";

const Container = styled.div`
  background-color: #02000e;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 1080px;
  background-image: radial-gradient(
    50% 50% at 50% 50%,
    rgba(2, 0, 14, 0.01) 10%,
    #02000E 100%
    ),url(${props => props.imgurl});
  background-repeat: no-repeat;
	background-position: center;


  @media only screen and (max-width: 744px){
    height: 1200px;
    background-size: 714px 598px;
  }

  @media only screen and (max-width: 375px){
    height: 812px;
    background-size: 394px 330px;
  }
`;

const HeaderGradient = styled.div`
  position: absolute;
  top: -100px;
  left: -100px;
  width: 199px;
  height: 273px;
  background: radial-gradient(
    50% 50%,
    rgb(20, 195, 254, 0.16),
    rgb(255, 255, 255, 0)
    );
`;

const HeaderTitle = styled.div`
  margin-top: 140px;
  color: #fff;
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  line-height: 31px;
  span{
    color: #f96d69;
  }

  @media only screen and (max-width: 744px){
    margin-top: 120px;
    font-size: 20px;
    line-height: 24px;
  }

  @media only screen and (max-width: 375px){
    margin-top: 100px;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
  }
`;

const HeaderLogo = styled.img`
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

const HeaderButotn = styled.button`
  margin-top: 584px;
  width: 477px;
  height: 48px;
  border-radius: 3px;
  border: none;
  background: linear-gradient(90deg, #f86f65 0%, #fe5493 100%);
  color: #fff;
  font-size: 14px;
  font-weight: 700;

  @media only screen and (max-width: 744px){
    margin-top: 770px;
    width: 477px;
    height: 48px;
  }

  @media only screen and (max-width: 375px){
    margin-top: 451px;
    width: 230px;
    height: 48px;
    font-weight: 400;
  }
`;


const ContentText = styled.div`
  position: absolute;
  top: -110px;
  left: 2px;
  width: 311px;
  height: 93px;
  text-align: center;

  h1{
    margin: 0 auto;
    color: #d2c030;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
  }

  p{
    margin: 8px auto 0;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
  }

  @media only screen and (max-width: 744px){
    left: -50px;
    p{
      font-size: 20px;
      line-height: 24px;
    }
  }

  @media only screen and (max-width: 375px){
    p{
      font-size: 20px;
      line-height: 24px;
    }
  }
`;

const MainContent = styled.div`
  position: relative;
  width: 320px;
  height: 694px;
  background-image: url(${props => props.imgurl});


  @media only screen and (max-width: 744px){
    width: 200px;
    height: 433px;
    background-size: 200px 433px;
  }
`;

const MainGradient = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 187px;
  height: 3091px;
	transform: translate(-50%, -50%);
  background: linear-gradient(
    180deg,
    #030615 0%,
    #051D31 42.67%,
    #051E32 53.12%,
    #051C30 74.27%,
    #030B1C 100%
    );

  @media only screen and (max-width: 744px){
    width: 117px;
    height: 1928px;
  }

  @media only screen and (max-width: 375px){
    width: 117px;
    height: 2133px;

    ${MainContent}:nth-child(odd){
      ${ContentText}{
        left: -40px;
        text-align: start;
      }
    }

    ${MainContent}:nth-child(even){
      ${ContentText}{
        left: -70px;
        text-align: end;
      }
    }
  }
`;

const MainSection = styled.div`
  width: 100%;
  height: 1200px;
  background-image:
  radial-gradient(
    50% 50% at 50% 50%,
    rgba(2, 0, 14, 0) 10%,
    rgba(2, 0, 14, 0.180099) 20%,
    rgba(2, 0, 14, 0.5) 20%,
    #02000E 100%
    ), url(${props => props.imgurl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1200px 1200px;

  @media only screen and (max-width: 744px){
    height: 744px;
    background-size: 744px 744px;
  }

  @media only screen and (max-width: 375px){
    height: 812px;
    background-size: 700px 700px;
  }
`;


const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;


export default function LandingPage() {
	return (
		<Container>
			<Header imgurl={HeaderBackgroundImage}>
				<HeaderGradient />
				<HeaderTitle>
					내가 좋아하는 아이돌을<br></br>
					가장 <span>쉽게 덕질</span> 하는 방법
				</HeaderTitle>
				<HeaderLogo src={LogoImage} alt='헤더로고' />
				<HeaderButotn>지금 시작하기</HeaderButotn>
			</Header>
			<Main>
				<MainGradient>
					<MainContent imgurl={ContentImage1}>
						<ContentText>
							<h1>후원하기</h1>
							<p>
								좋아하는 아이돌에게<br></br>
								쉽게 조공해 보세요
							</p>
						</ContentText>
					</MainContent>
					<MainContent imgurl={ContentImage2}>
						<ContentText>
							<h1>이달의 아티스트</h1>
							<p>
								내 아티스트에게 1등의<br></br>
								영예를 선물하세요
							</p>
						</ContentText>
					</MainContent>
					<MainContent imgurl={ContentImage3}>
						<ContentText>
							<h1>나만의 아티스트</h1>
							<p>
								좋아하는 아티스트들의<br></br>
								소식을 모아보세요
							</p>
						</ContentText>
					</MainContent>
				</MainGradient>
				<MainSection imgurl={MainBackgroundImage1} />
				<MainSection imgurl={MainBackgroundImage2} />
				<MainSection imgurl={MainBackgroundImage3} />
			</Main>
		</Container>
	);
}
