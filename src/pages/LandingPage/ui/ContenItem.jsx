import styled from 'styled-components';

export const ContentText = styled.div`
  position: absolute;
  top: -110px;
  left: 2px;
  width: 311px;
  height: 93px;
  text-align: center;

  h1{
    margin: 0 auto;
    color: #d2c030;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
  }

  p{
		padding: 0 48px;
    margin: 8px auto 0;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
  }

  @media only screen and (max-width: 744px){
    left: -50px;
    p{
			padding: 0 65px;
      font-size: 20px;
      line-height: 24px;
    }
  }

  @media only screen and (max-width: 375px){
    p{
			padding: 0;
    }
  }
`;

export const MainContent = styled.div`
  position: relative;
  width: 320px;
  height: 694px;
  background-image: url(${props => props.$imgurl});


  @media only screen and (max-width: 744px){
    width: 200px;
    height: 433px;
    background-size: 200px 433px;
  }
`;

export default function ContentItem({ imgurl, title, description }) {
	return (
		<MainContent $imgurl={imgurl}>
      <ContentText>
				<h1>{title}</h1>
					<p>{description}</p>
      </ContentText>
    </MainContent>
	);
}
