import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "@/common/assets/images/HeaderLogo.svg";
import ContentImage1 from "@/common/assets/images/MainContent_1.png";
import ContentImage2 from "@/common/assets/images/MainContent_2.png";
import ContentImage3 from "@/common/assets/images/MainContent_3.png";
import HeaderBackgroundImage from "@/common/assets/images/HeaderBackground.png";
import MainBackgroundImage1 from "@/common/assets/images/MainBackground_1.png";
import MainBackgroundImage2 from "@/common/assets/images/MainBackground_2.png";
import MainBackgroundImage3 from "@/common/assets/images/MainBackground_3.png";
import ContentItem from "@/app/pages/LandingPage/widgets/ContentItem";
import { PinkButton } from "@/common/ui/Button";
import { ContentText, MainContent } from "./widgets/ContentItem";

export default function LandingPage() {
	const navigate = useNavigate();
	const mainBackgroundImages = [
		MainBackgroundImage1,
		MainBackgroundImage2,
		MainBackgroundImage3,
	];
	return (
		<>
			<Header $imgurl={HeaderBackgroundImage}>
				<HeaderTitle>
					내가 좋아하는 아이돌을<br></br>
					가장 <span>쉽게 덕질</span> 하는 방법
				</HeaderTitle>
				<HeaderLogo src={LogoImage} alt="헤더로고" />
				<HeaderButton
					onClick={() => navigate("/list")}
					height="48px"
					width="477px"
				>
					지금 시작하기
				</HeaderButton>
			</Header>

			<Main>
				<MainGradient>
					<ContentItem
						imgurl={ContentImage1}
						title="후원하기"
						description="좋아하는 아이돌에게 쉽게 조공해 보세요"
					/>
					<ContentItem
						imgurl={ContentImage2}
						title="이달의 아티스트"
						description="내 아티스트에게 1등의 영예를 선물하세요"
					/>
					<ContentItem
						imgurl={ContentImage3}
						title="나만의 아티스트"
						description="좋아하는 아티스트들의 소식을 모아보세요"
					/>
				</MainGradient>

				{mainBackgroundImages.map((image, index) => (
					<MainSection key={index} $imgurl={image} />
				))}
			</Main>
		</>
	);
}

export const Header = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 1080px;
	position: relative;
	isolation: isolate;
	background-image: url(${(props) => props.$imgurl});
	background-repeat: no-repeat;
	background-position: center;

	&::before {
		content: "";
		top: -250px;
		left: -250px;
		width: 500px;
		height: 500px;
		opacity: 25%;
		display: block;
		position: absolute;
		background-image: radial-gradient(circle, #14c3fe 0%, transparent 50%);
	}

	&::after {
		content: "";
		position: absolute;
		background-image: radial-gradient(
			circle,
			rgba(2, 0, 14, 0.5) 35%,
			#02000e 45%
		);
		z-index: -1;
		inset: 0;
	}

	@media only screen and (max-width: 744px) {
		height: 1200px;
		background-size: 714px 598px;

		&::after {
			content: "";
			position: absolute;
			background-image: radial-gradient(
				circle,
				rgba(2, 0, 14, 0.5) 35%,
				#02000e 45%
			);
			z-index: -1;
			inset: 0;
		}
	}

	@media only screen and (max-width: 375px) {
		height: 812px;
		background-size: 394px 330px;
	}
`;

export const HeaderTitle = styled.div`
	margin-top: 140px;
	color: #fff;
	font-size: 26px;
	font-weight: 700;
	text-align: center;
	line-height: 31px;
	span {
		color: #f96d69;
	}

	@media only screen and (max-width: 744px) {
		margin-top: 120px;
		font-size: 20px;
		line-height: 24px;
	}

	@media only screen and (max-width: 375px) {
		margin-top: 100px;
		font-size: 20px;
		font-weight: 400;
		line-height: 24px;
	}
`;

export const HeaderLogo = styled.img`
	margin-top: 29px;
	width: 509px;
	height: 97px;

	@media only screen and (max-width: 744px) {
		margin-top: 32px;
		width: 325px;
		height: 62px;
	}

	@media only screen and (max-width: 375px) {
		margin-top: 20px;
		width: 237px;
		height: 45px;
	}
`;

export const HeaderButton = styled(PinkButton)`
	margin-top: 584px;
	font-size: 14px;
	font-weight: 700;

	@media only screen and (max-width: 744px) {
		margin-top: 770px;
		width: 477px;
		height: 48px;
	}

	@media only screen and (max-width: 375px) {
		margin-top: 451px;
		width: 230px;
		height: 48px;
		font-weight: 400;
	}
`;

export const MainGradient = styled.div`
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
		#051d31 42.67%,
		#051e32 53.12%,
		#051c30 74.27%,
		#030b1c 100%
	);

	@media only screen and (max-width: 744px) {
		width: 117px;
		height: 1928px;
	}

	@media only screen and (max-width: 375px) {
		width: 117px;
		height: 2133px;

		${MainContent}:nth-child(odd) {
			${ContentText} {
				left: -40px;
				text-align: start;
				padding-right: 130px;
			}
		}

		${MainContent}:nth-child(even) {
			${ContentText} {
				left: -70px;
				text-align: end;
				padding-left: 130px;
			}
		}
	}
`;

export const MainSection = styled.div`
	width: 1200px;
	height: 1200px;
	background-image: radial-gradient(
			50% 50% at 50% 50%,
			rgba(2, 0, 14, 0) 5%,
			rgba(2, 0, 14, 0.180099) 5%,
			rgba(2, 0, 14, 0.5) 5%,
			#02000e 90%
		),
		url(${(props) => props.$imgurl});
	background-repeat: no-repeat;
	background-position: center;
	background-size: 1200px 1200px;

	@media only screen and (max-width: 744px) {
		height: 744px;
		background-size: 744px 744px;
	}

	@media only screen and (max-width: 375px) {
		height: 812px;
		background-size: 700px 700px;
	}
`;

export const Main = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;
