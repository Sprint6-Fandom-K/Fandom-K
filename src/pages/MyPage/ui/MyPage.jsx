import React, { useEffect, useState } from "react";
import "./mypage.css";
import "./eunbin.css";
import IdolCard from "@/shared/ui/IdolCard/IdolCard";
import { getIdols } from "@/shared/api/idols";
import Frame1 from "../../../shared/assets/images/Frame 33648.png";
import Frame2 from "../../../shared/assets/images/Frame 27.png";
import Frame3 from "../../../shared/assets/images/Frame 33588.png";
import Frame4 from "../../../shared/assets/images/Vector 668.png";
import Frame5 from "../../../shared/assets/images/Vector 6688.png";

const MyPage = () => {
	const [idols, setIdols] = useState([]);

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
		<div className="container">
			<div id="logo-container">
				<header>
					<div id="logo">
						<img src={Frame1} alt="framelogo" />
						<a href="/"></a>
					</div>

					<div id="frame">
						<img src={Frame2} alt="frame" />
						<a href="/"></a>
					</div>
				</header>
			</div>

			<div className="idol-container">
				<h1>내가 관심있는 아이돌</h1>
				{/* <IdolCard /> */}
			</div>

			<div id="line">
				<img src={Frame3} alt="line" />
			</div>

			<div className="idol-add-container">
				<h1>관심 있는 아이돌을 추가해보세요.</h1>

				<div className="idol-carousel-container">
					<button class="left-button">
						<img src={Frame4} alt="line" />
					</button>
					<ul className="idol-profile-box">
						{idols?.map((idol) => {
							return (
								<li key={idol.id}>
									<IdolCard info={idol} />
								</li>
							);
						})}
					</ul>
					<button class="right-button">
						<img src={Frame5} alt="line" />
					</button>
				</div>
			</div>

			<a href="/">
				<button className="add-button">+ 추가하기</button>
			</a>
		</div>
	);
};

export default MyPage;
