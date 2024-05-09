import { useEffect, useRef, useState } from "react"; import "./index.scss";
// widgets
import Carousel from "@/widgets/Carousel";
// assets/icons
import ArrowLeft from "@/shared/assets/icons/ArrowLeft";
import ArrowRight from "@/shared/assets/icons/ArrowRight";

import API from "@/shared/api";

import Donate from "@/widgets/Donate";

import useViewport from "@/shared/hooks/useViewport";

export default function PendingDonations()
{
	const { isDesktop, isTablet, isMobile } = useViewport();

	function get_columns()
	{
		return isDesktop ? 4 : isTablet ? 3 : isMobile ? 3 : 0;
	}

	const [idols, set_idols] = useState([]);
	const [cursor, set_cursor] = useState(null);
	const [columns, set_columns] = useState(get_columns());

	const last_child = useRef();

	useEffect(() =>
	{
		set_columns(get_columns());
	},
	[isDesktop, isTablet, isMobile]);

	useEffect(() =>
	{
		if (columns)
		{
			API["{team_name}/donations"].GET(undefined, { page_size: columns }).then((response) =>
			{
				set_idols(response.list); set_cursor(response.nextCursor);
			});
		}
	},
	[columns]);

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
						API["{team_name}/donations"].GET(undefined, { page_size: columns, cursor: cursor }).then((response) =>
						{
							set_idols((idols) => [...idols, ...response.list]); set_cursor(response.list.length >= columns ? response.nextCursor : null);
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
			observer.observe(last_child.current);
		}
	},
	[cursor]);

	return (
		<section data-widget="PendingDonations">
			<Carousel swipe={isDesktop ? null : 1} columns={columns} sensitivity={100}>
				<Carousel.Button to="prev" style={{ left: -80 }} class={["hide-on-tablet", "hide-on-mobile"]}>
					<ArrowLeft></ArrowLeft>
				</Carousel.Button>
				<Carousel.Slider gap={25}>
				{
					[...idols, ...new Array(cursor ? columns : idols.length ? 0 : columns).fill(null)].map((idol, index, array) =>
					{
						return (
							<Carousel.Item key={index} ref={index === array.length - 1 ? last_child : null}>
								<Donate donation={idol}></Donate>
							</Carousel.Item>
						);
					})
				}
				</Carousel.Slider>
				<Carousel.Button to="next" style={{ right: -80 }} class={["hide-on-tablet", "hide-on-mobile"]}>
					<ArrowRight></ArrowRight>
				</Carousel.Button>
			</Carousel>
		</section>
	);
}
