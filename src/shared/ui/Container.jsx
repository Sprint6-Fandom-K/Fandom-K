import styled from "styled-components";

const RoundedImage = styled.img`
	width: 60px;
	height: 60px;
	border-radius: 40px;
`;

const RoundedDiv = styled.div`
	width: 70px;
	height: 70px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 40px;
	border: 1px solid #f96d69;
`;

export const ImageContainer = ({ src, alt }) => (
	<RoundedDiv>
		<RoundedImage src={src} alt={alt} />
	</RoundedDiv>
);

export const FlexContainer = styled.div`
	display: flex;
	justify-content: ${({ $jc }) => $jc};
	align-items: ${({ $ai }) => $ai};
	flex-direction: ${({ $fd }) => $fd};
	gap: ${({ $gap }) => $gap};
`;

export const FlexItemContainer = styled.div`
	flex: ${({ $flex }) => $flex};
`;

export const MainContainer = styled.main`
	background-color: var(--black1);
	display: flex;
`;

export const MainContentContainer = styled.div`
	background-color: var(--black1);
	margin-inline: auto;
	margin-bottom: 243px;
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
