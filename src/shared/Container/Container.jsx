import styled from "styled-components";

export const FlexContainer = styled.div`
	display: flex;
	justify-content: ${({ $jc }) => $jc};
	align-items: ${({ $ai }) => $ai};
	flex-direction: ${({ $fd }) => $fd};
	gap: ${({ $gap }) => $gap};
`;

export const MainContainer = styled.main`
	background-color: #02000e;
	display: flex;
`;

export const MainContentContainer = styled.div`
	background-color: #02000e;
	margin-inline: auto;
	margin-bottom: 243px;
	color: white;
	width: 1200px;
	@media (width<=1199px) {
		margin-bottom: 330px;
		margin-inline: 20px;
	}
	@media (width<=767px) {
		margin-bottom: 59px;
		margin-inline: 24px;
	}
`;

export const FlexItemContainer = styled.div`
	flex: ${({ $flex }) => $flex};
`;
