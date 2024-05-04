import { createPortal } from "react-dom";
import { useState } from "react";
import Credit from "@/shared/asset/CreditImage.svg";
import Close from "@/shared/asset/CloseX.svg";
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

const CreditImg = styled.div`
	background-color: aqua;
	width: 113px;
	height: 113px;
	margin-top: 56px ;
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

const NoCreditModal = styled.div`
	position: absolute;
	top: 45%;
	left: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 31px;
	width: 339px;
	height: 331px;
	transform: translate(-50%, -50%);
	border-radius: 12px;
	background-color: #181D26;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
	margin-top: 70px;
	align-items: center;
	gap: 8px;
`;

const RadioLabel = styled.label`
  background-color: #020003;
	width: 295px;
	height: 62px;
  border-radius: 8px;
	border: 1px solid #f7f7f8;
	color: #fff;
	font-size: 20px;
	font-weight: 700;
	display: flex;
	align-items: center;
	gap: 183px;
`;

const CustomRadio = styled.input.attrs({ type: 'radio' })`
	appearance: none;

	display: inline-block;
	width: 16px;
	height: 16px;

	background-color: #fff;
	border: 2px solid #8C92AB;
	border-radius: 50%;

	&:checked{
		border: 2px solid #F96D69;
	}
`;

const ChargeCreditModal = styled.div`
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

const RadioModal = ({ options, onClose, onSelect }) => {
	const [selectedOption, setSelectedOption] = useState(null);

	const handleOptionChange = (option) => {
		setSelectedOption(option);
		onSelect(option);
	};


	const handleCharge = () => {
		onClose(false);
		console.log("모달창 닫고 크레딧 충전");
	}

	return (
		<Overlay>
			<ChargeCreditModal>
				<Text>크레딧 충전하기</Text>
				<CloseButton onClick={onClose}>
					<img src={Close} alt="닫기" />
				</CloseButton>

				<RadioWrapper>
					{options.map((option, index) => (
						<RadioLabel key={index}>
							{option.label}
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
			</ChargeCreditModal>
		</Overlay>
	);
}

export default function Modals() {

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


