import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
	:root {
		/* color */
		--black-02000e: #02000e;
		--black-181d26: #181d26;
		--gray-67666E: #67666E;
		--gray-828282: #828282;
		--gray-8c92ab: #8c92ab;
		--gray-a3a5a8: #a3a5a8;
		--white-f7f7f8: #f7f7f8;
		--orange: #f96d69;
		--pink: #fe5493;
	}

	@font-face {
  font-family: "Pretendard";
  src: url("../font/Pretendard-Thin.woff2") format("woff2");
  font-weight: 100;
}

@font-face {
  font-family: "Pretendard";
  src: url("../font/Pretendard-ExtraLight.woff2") format("woff2");
  font-weight: 200;
}

@font-face {
  font-family: "Pretendard";
  src: url("../font/Pretendard-Light.woff2") format("woff2");
  font-weight: 300;
}

@font-face {
  font-family: "Pretendard";
  src: url("../font/Pretendard-Regular.woff2") format("woff2");
  font-weight: 400;
}

@font-face {
  font-family: "Pretendard";
  src: url("../font/Pretendard-Medium.woff2") format("woff2");
  font-weight: 500;
}

@font-face {
  font-family: "Pretendard";
  src: url("../font/Pretendard-SemiBold.woff2") format("woff2");
  font-weight: 600;
}

@font-face {
  font-family: "Pretendard";
  src: url("../font/Pretendard-Bold.woff2") format("woff2");
  font-weight: 700;
}

@font-face {
  font-family: "Pretendard";
  src: url("../font/Pretendard-ExtraBold.woff2") format("woff2");
  font-weight: 800;
}

@font-face {
  font-family: "Pretendard";
  src: url("../font/Pretendard-Black.woff2") format("woff2");
  font-weight: 900;
}

* {
  margin: 0;
  box-sizing: border-box;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
}

img {
	width: 100%;
	height: 100%;
}
`;
