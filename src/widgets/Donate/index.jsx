import { useEffect, useRef, useState } from "react"; import "./index.scss"; import widget from "@/shared/utilities/widget";

import API from "@/shared/api";

import { seperate } from "@/shared/utilities/number";
import { countdown } from "@/shared/utilities/date";

const LOCALE = { year: "년", month: "달", day: "일", hour: "시간", minute: "분", second: "초" };

export default function Donate(props = { /* html */ id: null, class: [], style: {}, children: null, /* props */ idol: {} })
{
	const [donation, set_donation] = useState(null);
	const [tick, set_tick] = useState(null);

	const ref = useRef(null);

	useEffect(() =>
	{
		if (props.idol)
		{
			const observer = new IntersectionObserver((entries, observer) =>
			{
				for (const entry of entries)
				{
					if (entry.isIntersecting)
					{
						API["{team_name}/donations"].GET(undefined, { page_size: 1, priority_idol_ids: [props.idol.id] }).then((response) =>
						{
							setTimeout(() =>
							{
								set_donation(response.list[0]);
							},
							1000);
						});
						// big brother is gone...
						observer.disconnect();
					}
				}
			},
			{
				threshold: 0.95
			});
			// big brother..!
			observer.observe(ref.current);
		}
	},
	[ref.current]);

	useEffect(() =>
	{
		let interval = null;

		const observer = new IntersectionObserver((entries, observer) =>
		{
			for (const entry of entries)
			{
				if (entry.isIntersecting)
				{
					interval ??= setInterval(() =>
					{
						set_tick(new Date());
					},
					1000);
				}
				else
				{
					interval = clearInterval(interval);
				}
			}
		},
		{
			threshold: 0.25
		});
		// big brother..!
		observer.observe(ref.current);

		return () => { interval = clearInterval(interval); /* big brother is gone... */ observer.disconnect(); };
	},
	[]);

	return (
		<section ref={ref} { ...widget("Donate", props) } data-is-loading={donation === null}>
			<div class="portrait" style={{ "background-image": ["linear-gradient(180deg, rgba(0, 0, 0, 0) 58.9%, #000000 100%)", `url("${props.idol?.["profilePicture"]}")`].join(",") }}>
				<div class="button skeleton">
					후원하기
				</div>
			</div>
			<div class="info">
				<div class="title skeleton">
					{donation?.title ?? "..."}
				</div>
				<div class="subtitle skeleton">
					{donation?.subtitle ?? "..."}
				</div>
				<div class="milestone">
					<div class="wrapper">
						<div class="credit skeleton">
							{donation ? seperate(donation.targetDonation) : "..."}
						</div>
						<div class="deadline skeleton">
							{donation ? countdown(tick, new Date(Date.parse(donation.deadline)), LOCALE) + "\u0020" + "남음" : "..."}
						</div>
					</div>
					<div class="progress" style={{ "background-image": `linear-gradient(to right, #F96D69 ${donation ? (donation.receivedDonations / donation.targetDonation) * 100 : 0}%, #FFFFFF ${donation ? (donation.receivedDonations / donation.targetDonation) * 100 : 0}%)` }}></div>
				</div>
			</div>
		</section>
	);
}
