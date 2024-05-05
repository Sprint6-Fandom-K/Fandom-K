import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalContainer = styled.div`
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
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(49, 49, 49, 0.8);
`;

export default function Modal({ children }) {
	return (
		<>
			{createPortal(
				<Overlay>
					<ModalContainer>{children}</ModalContainer>
				</Overlay>,
				document.body,
			)}
		</>
	);
}
