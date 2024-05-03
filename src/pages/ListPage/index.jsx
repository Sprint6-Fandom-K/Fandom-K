import { useEffect, useRef, useState } from "react"; import "./index.scss";
// widgets
import Carousel from "@/widgets/Carousel";
// assets/icons
import ArrowLeft from "@/shared/assets/icons/ArrowLeft";
import ArrowRight from "@/shared/assets/icons/ArrowRight";

import Header from "@/widgets/Header";
import Donate from "@/widgets/Donate";
import API from "@/shared/api";

const COLUMNS = 4;

export default function ListPage()
{
	const [idols, set_idols] = useState([]);
	const [cursor, set_cursor] = useState(null);

	const ref = useRef();

	useEffect(() =>
	{
		API["{team_name}/idols"].GET(undefined, { page_size: COLUMNS * 2 }).then((response) =>
		{
			set_idols(response.list);
			set_cursor(response.nextCursor);
		});
	},
	[]);

	useEffect(() =>
	{
		if (cursor)
		{
			const observer = new IntersectionObserver((entries, observer) =>
			{
				for (const entry of entries)
				{
					if (entry.isIntersecting)
					{
						API["{team_name}/idols"].GET(undefined, { page_size: COLUMNS, cursor: cursor }).then((response) =>
						{
							set_idols((idols) => [...idols, ...response.list]);
							set_cursor(response.list.length >= COLUMNS ? response.nextCursor : null);
						});
						// big brother is gone...
						observer.disconnect();
					}
				}
			},
			{
				threshold: 0.25
			});
			// big brother
			observer.observe(ref.current);
		}
	},
	[cursor]);

	return (
		<section data-widget="ListPage">
			<Header></Header>
			<div class="container">
				<div class="segment">
					<div class="heading">
						후원을 기다리는 조공
					</div>
					<Carousel columns={COLUMNS} threshold={100}>
						<Carousel.Button to="prev" style={{ left: -80 }} class={["hide-on-tablet", "hide-on-mobile"]}>
							<ArrowLeft></ArrowLeft>
						</Carousel.Button>
						<Carousel.Wrapper gap={25}>
						{
							(idols ? idols : new Array(COLUMNS * 2).fill(null)).map((idol, index, array) =>
							{
								return (
									<Carousel.Item key={index} ref={index === array.length - 1 ? ref : null}>
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
