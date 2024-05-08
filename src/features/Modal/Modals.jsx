import { useState } from "react";
import Close from "@/shared/assets/icons/CloseX.svg";
import styled from "styled-components";
import { Modal } from "@/app";
import useLocalStorage from "@/shared/hooks/useLocalStorage";
import CreditIcon from "@/shared/assets/icons/CreditIcon";

const CloseButton = styled.button`
	position: absolute;
	top: 24px;
	right: 20px;
	border: none;
	background-color: #181d26;
	cursor: pointer;
`;

const CommonButton = styled.button`
	width: 295px;
	height: 42px;
	border-radius: 3px;
	border: none;
	background: linear-gradient(to left, #f86f65, #fe5493);
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
	span {
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

const CustomRadio = styled.input.attrs({ type: "radio" })`
	appearance: none; // 기본 브라우저에서 기본 스타일 제거
	display: inline-block;
	width: 16px;
	height: 16px;
	box-shadow: 0 0 0 1px #8c92ab; // radio 버튼 테두리
	border: 2px solid #fff; // 테두리와 원 사이의 색상
	background-color: #8c92ab; // radio 버튼 내부 원 색상
	border-radius: 50%;

	// 체크될 시에, 변화되는 스타일 설정
	&:checked {
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
	background-color: #181d26;

	${CloseButton} {
		right: 16px;
	}

	${Text} {
		position: absolute;
		top: 25px;
		left: 17px;
		font-size: 18px;
		font-weight: 600;
		line-height: 21px;
	}
`;

export default function RadioModal({ options }) {
	const [credit, setCredit] = useLocalStorage("credit", 0);
	// 크레딧 충전하는 모달 컴포넌트
	const [selectedOption, setSelectedOption] = useState(null);

	const handleOptionChange = (option) => {
		setSelectedOption(option);
	};

	const handleCharge = () => {
		setCredit((credit) => credit + selectedOption);
		Modal.open(
			<div style={{ color: "white" }}>
				{selectedOption}크레딧이 충전되었습니다! 2초 뒤에 자동으로 닫힙니다.
			</div>,
		);
		setTimeout(Modal.close, 2000);
	};

	return (
		<ChargeModal>
			<Text>크레딧 충전하기</Text>
			<CloseButton onClick={() => Modal.close()}>
				<img src={Close} alt="닫기" />
			</CloseButton>
			<RadioWrapper>
				{options.map((option, index) => (
					<RadioLabel key={index}>
						<ValueWrapper>
							<CreditIcon />
							{option}
						</ValueWrapper>
						<CustomRadio
							type="radio"
							value={option}
							checked={selectedOption === option}
							onChange={() => handleOptionChange(option)}
						/>
					</RadioLabel>
				))}
			</RadioWrapper>
			<CommonButton onClick={handleCharge}>충전하기</CommonButton>
		</ChargeModal>
	);
}
