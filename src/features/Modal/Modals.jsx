import { createPortal } from "react-dom";
import { useState } from "react";
import Credit from "@/shared/assets/icons/Credit.svg";
import Close from "@/shared/assets/icons/CloseX.svg";
import styled from "styled-components";

const CloseButton = styled.button`
	position: absolute;
	top: 24px;
	right: 20px;
	border: none;
	background-color: #181D26;
	cursor: pointer;
`;

const CommonButton = styled.button`
	width: 295px;
	height: 42px;
	border-radius: 3px;
	border: none;
	background: linear-gradient(
		to left,
		#F86F65, #FE5493
		);
	color: #fff;
	font-size: 14px;
	font-weight: 700;
	cursor: pointer;
`;

const Text = styled.p`
	color: #fff;
	font-size: 16px;
	font-weight: 500;
	line-height: 26px;
	span{
		color: #f96d69;
	}
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
	align-items: center;
	gap: 8px;
	margin-top: 70px;
`;

const ValueWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 6.5px;
`;

const RadioLabel = styled.label`
	box-sizing: border-box;
	padding: 18px 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 295px;
	height: 62px;
  border-radius: 8px;
	border: 1px solid #f7f7f8;
  background-color: #020003;
	color: #fff;
	font-size: 20px;
	font-weight: 700;
`;

const CustomRadio = styled.input.attrs({ type: 'radio' })`
	appearance: none; // 기본 브라우저에서 기본 스타일 제거
	display: inline-block;
	width: 16px;
	height: 16px;
	box-shadow: 0 0 0 1px #8c92ab; // radio 버튼 테두리
	border: 2px solid #fff; // 테두리와 원 사이의 색상
	background-color: #8c92ab; // radio 버튼 내부 원 색상
	border-radius: 50%;

	// 체크될 시에, 변화되는 스타일 설정
	&:checked{
		box-shadow: 0 0 0 1px #f96d69;
		border: 2px solid #fff;
		background-color: #f96d69;
	}
`;

const ChargeModal = styled.div`
	position: absolute;
	top: 45%;
	left: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 31px;
	width: 327px;
	height: 372px;
	transform: translate(-50%, -50%);
	border-radius: 8px;
	background-color: #181D26;

	${CloseButton}{
		right: 16px;
	}

	${Text}{
		position: absolute;
		top: 25px;
		left: 17px;
		font-size: 18px;
		font-weight: 600;
		line-height: 21px;
	}
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(49,49,49,0.8);
`;

const RadioModal = ({ options, onClose, onSelect }) => { // 크레딧 충전하는 모달 컴포넌트
	const [selectedOption, setSelectedOption] = useState(null);

	const handleOptionChange = (option) => {
		setSelectedOption(option);
		onSelect(option);
	};


	const handleCharge = () => {
		onClose(false);
		console.log("모달창 닫고 크레딧 충전");
		console.log(selectedOption);
	}

	return (
		<Overlay>
			<ChargeModal>
				<Text>크레딧 충전하기</Text>
				<CloseButton onClick={onClose}><img src={Close} alt="닫기" /></CloseButton>
				<RadioWrapper>
					{options.map((option, index) => (
						<RadioLabel key={index}>
							<ValueWrapper>
								<img src={Credit} alt="크레딧"/>
								{option.label}
							</ValueWrapper>
							<CustomRadio
								type="radio"
								value={option.value}
								checked={selectedOption === option.value}
								onChange={() => handleOptionChange(option.value)}
							/>
						</RadioLabel>
					))}
				</RadioWrapper>
				<CommonButton onClick={handleCharge}>
					충전하기
				</CommonButton>
			</ChargeModal>
		</Overlay>
	);
}

export default function Modals() { // ListPage 라고 가정

	const options = [
		{ label: '100', value: 100 },
		{ label: '500', value: 500 },
		{ label: '1000', value: 1000 },
	];

	const [selectedOption, setSelectedOption] = useState(null);
	const [showModal, setShowModal] = useState(false);


	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	}

	const handleSelectOption = (option) => {
		setSelectedOption(option);
		console.log(`선택한 값 : ${option}`);
	};

	return (
		<>
			<button onClick={openModal}>크레딧 충전하기</button>

			{showModal && createPortal(
				<RadioModal
					options={options}
					onClose={closeModal}
					onSelect={handleSelectOption}
				/>, document.body
			)}
		</>
	);
}
