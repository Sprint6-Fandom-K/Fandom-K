import React, { useEffect, useState } from "react";
import "./mypage.css";
import IdolCard from "@/shared/ui/IdolCard/IdolCard";
import { getIdols } from "@/shared/api/idols";
import Frame1 from "../../../shared/assets/images/Frame 33648.png";
import Frame2 from "../../../shared/assets/images/Frame 27.png";
import Frame3 from "../../../shared/assets/images/Frame 33588.png";
import Frame4 from "../../../shared/assets/images/Vector 668.png";
import Frame5 from "../../../shared/assets/images/Vector 6688.png";
import plusIcon from "../../../shared/assets/icons/Ic_plus_24px.svg";

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
			<div className="inner">
				<header>
					<div className="logo-box">
						<a href="#none" className="logo">
							{/* alt 속성은 이미지 엑박뜰 때 보이는 텍스트라서 알아보기 쉬운 문구로 하는 게 좋아요! */}
							<img src={Frame1} alt="FANDOM-K" />
						</a>
					</div>

					<a href="#none">
						<img src={Frame2} alt="마이페이지" />
					</a>
				</header>

				<div className="my-page">
					{/* 관심있는 아이돌 */}
					<section className="idol-section">
						<h1>내가 관심있는 아이돌</h1>
						<div className="idol-box">{/* <IdolCard /> */}</div>
					</section>

					<hr />

					{/* 아이돌 목록 */}
					<section className="idol-section">
						<h1>관심 있는 아이돌을 추가해보세요.</h1>

						<div className="idol-box carousel-container">
							<button className="arrow left-arrow">
								<img src={Frame4} alt="line" />
							</button>
							<ul className="idol-list">
								{idols?.map((idol) => {
									return (
										<li key={idol.id}>
											<IdolCard info={idol} />
										</li>
									);
								})}
							</ul>
							<button className="arrow right-arrow">
								<img src={Frame5} alt="line" />
							</button>
						</div>
					</section>

					<button className="add-button">
						<div className="icon">
							<img src={plusIcon} alt="+" />
						</div>
						<span>추가하기</span>
					</button>

					<div className="empty-box"></div>
				</div>
			</div>
		</div>
	);
};

export default MyPage;
