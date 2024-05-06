import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SelectContext } from "@/pages/MyPage/ui/MyPage";

import checkIcon from "../../assets/icons/Checkmark.svg";

const IdolCard = (props) => {
	const { info, padding, onClick } = props;
	const isAddingMode = useContext(SelectContext);
	const { profilePicture, name, group } = info;
	const [isSelected, setIsSelected] = useState(false);

	useEffect(() => {
		if (!isAddingMode) {
			setIsSelected(false);
		}
	}, [isAddingMode]);

	const handleCardClick = () => {
		setIsSelected(!isSelected);
		onClick();
	};

	return (
		<Card>
			<ImgArea padding={padding} onClick={handleCardClick}>
				<Img src={profilePicture} />
				{isSelected && isAddingMode && (
					<Check padding={padding}>
						<CheckIconBox>
							<img src={checkIcon} />
						</CheckIconBox>
					</Check>
				)}
			</ImgArea>
			<TextArea>
				<Name>{name}</Name>
				<Group>{group}</Group>
			</TextArea>
		</Card>
	);
};

const Card = styled.li`
	display: grid;
	gap: 8px;
	background-color: #02000e;
`;

const ImgArea = styled.div`
	border-radius: 50%;
	border: 1.3px solid #f77063;
	padding: ${({ padding }) => padding ?? 5}px;
	overflow: hidden;
	cursor: pointer;
	aspect-ratio: 1 / 1;
	position: relative;
`;

const Check = styled.div`
	background: linear-gradient(
		271.36deg,
		rgba(249, 110, 104, 0.5) -9.84%,
		rgba(254, 87, 143, 0.5) 107.18%
	);
	width: calc(100% - ${({ padding }) => padding ?? 5}px * 2);
	height: calc(100% - ${({ padding }) => padding ?? 5}px * 2);
	position: absolute;
	top: ${({ padding }) => padding ?? 5}px;
	left: ${({ padding }) => padding ?? 5}px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
`;

const CheckIconBox = styled.div``;

const Img = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	object-fit: cover;
`;

const TextArea = styled.div`
	display: grid;
	gap: 2px;
	text-align: center;
`;

const Name = styled.h5`
	font-size: 16px;
	font-weight: 700;
	line-height: 1.6;
	color: #f4efef;
`;

const Group = styled.h6`
	font-size: 14px;
	font-weight: 400;
	line-height: 1.2;
	color: #fff;
	opacity: 0.6;
`;

export default IdolCard;
