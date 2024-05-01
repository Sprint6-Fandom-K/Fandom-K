import React from "react";
import styled from "styled-components";

const IdolCard = (props) => {
	const { info } = props;
	const { profilePicture, name, group } = info;

	return (
		<Card>
			<ImgArea>
				<Img src={profilePicture} />
			</ImgArea>
			<TextArea>
				<Name>{name}</Name>
				<Group>{group}</Group>
			</TextArea>
		</Card>
	);
};

const Card = styled.div`
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
`;

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
