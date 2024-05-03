import { useEffect, useState } from "react"; import "./index.scss";
// widgets
import Carousel from "@/widgets/Carousel";
// assets/icons
import ArrowLeft from "@/shared/assets/icons/ArrowLeft";
import ArrowRight from "@/shared/assets/icons/ArrowRight";

import Header from "@/widgets/Header";
import Donate from "@/widgets/Donate";
import API from "@/shared/api";

export default function ListPage()
{
	const [idols, set_idols] = useState([]);

	useEffect(() =>
	{
		API["{team_name}/idols"].GET(undefined, { page_size: 4 * 10 }).then((response) =>
		{
			set_idols(response.list);
		});
	},
	[]);

	return (
		<section data-widget="ListPage">
			<Header></Header>
			<div class="container">
				<div class="segment">
					<div class="heading">
						후원을 기다리는 조공
					</div>
					<Carousel columns={4} sensitivity={100}>
						<Carousel.Button to="prev" style={{ left: -80 }} class={["hide-on-tablet", "hide-on-mobile"]}>
							<ArrowLeft></ArrowLeft>
						</Carousel.Button>
						<Carousel.Wrapper gap={25}>
						{
							(idols ? idols : new Array(4 * 10).fill(null)).map((idol, index) =>
							{
								return (
									<Carousel.Item key={index}>
										<Donate idol={idol}></Donate>
									</Carousel.Item>
								);
							})
						}
						</Carousel.Wrapper>
						<Carousel.Button to="next" style={{ right: -80 }} class={["hide-on-tablet", "hide-on-mobile"]}>
							<ArrowRight></ArrowRight>
						</Carousel.Button>
					</Carousel>
				</div>
				<div class="segment">
					<div class="heading">
						이달의 차트
					</div>
				</div>
			</div>
		</section>
	);
}
