import {} from "react"; import "./index.scss";
// widgets
import Carousel from "@/widgets/Carousel";
// assets/icons
import ArrowLeft from "@/shared/assets/icons/ArrowLeft";
import ArrowRight from "@/shared/assets/icons/ArrowRight";

import styled from "styled-components";

const Card = styled.section`
	height: 700px;
	background-color: gray;
	text-align: center;
	font-size: 100px;
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	user-select: none;
	border-radius: 15px;
	margin: 15px;

	&:hover
	{
		background: #2b2b2b;
	}
`;

export default function ListPage()
{
	return (
		<section data-page="/list">
			<Carousel columns={3} sensitivity={100}>
				<Carousel.Button to="prev">
					<ArrowLeft />
				</Carousel.Button>
				<Carousel.Wrapper gap={25}>
				{
					new Array(69).fill(null).map((_, index) =>
					{
						return (
							<Carousel.Item key={index}>
								<Card>
								{
									index + 1
								}
								</Card>
							</Carousel.Item>
						);
					})
				}
				</Carousel.Wrapper>
				<Carousel.Button to="next">
					<ArrowRight />
				</Carousel.Button>
			</Carousel>
		</section>
	);
}
