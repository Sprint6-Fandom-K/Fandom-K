import { keyframes } from "styled-components";

export const rotate = keyframes`
	from {
		transform: rotate(0deg);
	}
	to{
		transform: rotate(360deg);;
	}
`;

export const skeleton = keyframes`
	100% {
		transform: translateX(100%);
	}
`;
