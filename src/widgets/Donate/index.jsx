import { useEffect, useRef, useState } from "react"; import "./index.scss"; import widget from "@/shared/utilities/widget";

import API from "@/shared/api";

import Modal from "@/widgets/Modal";

import { seperate } from "@/shared/utilities/number";
import { countdown } from "@/shared/utilities/date";

const LOCALE = { year: "년", month: "달", day: "일", hour: "시간", minute: "분", second: "초" };

export default function Donate(props = { /* html */ id: null, class: [], style: {}, children: null, /* props */ idol: {} })
{
	const [donation, set_donation] = useState(null);
	const [modal, set_modal] = useState(false);
	const [time, set_time] = useState(null);

	const self = useRef(null);

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
				threshold: 0.25
			});
			// big brother..!
			observer.observe(self.current);
		}
	},
	[self.current]);

	useEffect(() =>
	{
		let interval = null;

		// eslint-disable-next-line no-unused-vars
		const observer = new IntersectionObserver((entries, observer) =>
		{
			for (const entry of entries)
			{
				if (entry.isIntersecting)
				{
					set_time(new Date());

					setTimeout(() =>
					{
						interval = setInterval(() =>
						{
							set_time(new Date());
						},
						1000);
					},
					1000 - new Date().getMilliseconds());
				}
				else
				{
					interval = clearInterval(interval);
				}
			}
		});
		// big brother..!
		observer.observe(self.current);

		return () => { interval = clearInterval(interval); /* big brother is gone... */ observer.disconnect(); };
	},
	[]);

	return (
		<section ref={self} { ...widget("Donate", props) } data-is-loading={donation === null}>
			<div class="portrait" style={{ "background-image": ["linear-gradient(180deg, rgba(0, 0, 0, 0) 58.9%, #000000 100%)", `url("${props.idol?.profilePicture}")`].join(",") }}>
				{/* eslint-disable-next-line no-unused-vars */}
				<div class="button skeleton" onClick={(event) => set_modal(true)}>
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
							{donation ? countdown(time, new Date(Date.parse(donation.deadline)), LOCALE) + "\u0020" + "남음" : "..."}
						</div>
					</div>
					<div class="progress" style={{ "background-image": `linear-gradient(to right, #F96D69 ${donation ? (donation.receivedDonations / donation.targetDonation) * 100 : 0}%, #FFFFFF ${donation ? (donation.receivedDonations / donation.targetDonation) * 100 : 0}%)` }}></div>
				</div>
			</div>
			{(() =>
			{
				if (modal)
				{
					return (
						// eslint-disable-next-line no-unused-vars
						<Modal onClickOutSide={(event) => set_modal(false)}>
							<section data-widget="Modal.Donate">
								<div class="heading">
									후원하기
								</div>
								<img class="portrait" src={props.idol?.profilePicture}></img>
								<div class="button">
									후원하기
								</div>
							</section>
						</Modal>
					);
				}
			})()}
		</section>
	);
}
