import React from 'react';
import './mypage.css';
import Frame1 from '../../../shared/assets/images/Frame 33648.png';
import IdolCard from '@/shared/ui/IdolCard/IdolCard';





const MyPage = () => {
	return (
		<div className='container'>
			<div id="logo-container">
				<header>
					<div id="logo">
						<img src ={Frame1} alt="framelogo" />
						<a href="/"></a>
					</div>
					<div id ="frame">
						<img src ="image/Frame 27.png" alt="frame" />
						<a href="/"></a>
					</div>
				</header>
			</div>

			<div class ="idol-container">
				<h1>내가 관심있는 아이돌</h1>
				<IdolCard />
			</div>

			<div id="line">
				<img src ="image/Frame 33588.png" alt="line" />
			</div>

			<div class="idol-add-container">
				<h1>관심 있는 아이돌을 추가해보세요.</h1>
				<button class="left-button"><img src ="image/Vector 668.png" alt="line" /></button>
				<button class="right-button"><img src ="image/Vector 6688.png" alt="line" /></button>
				<IdolCard />
			</div>

			<a href="/"><button class="add-button">+ 추가하기</button></a>
		</div>
	);
};

export default MyPage;
