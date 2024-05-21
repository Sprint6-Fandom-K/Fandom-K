# 💎 Fandom-K

<br>

### 🗓 개발 기간
2024.04.30 ~ 2024.05.17

<br>

## 👩🏻‍💻프로젝트 소개
<img src="https://github.com/sprint6-part2/fandom-k/assets/50625710/294b4bd6-168a-4bef-b66f-96f7003346d6" width=400>

- Fandom-K는 자신이 좋아하는 아이돌을 선택하고 후원하는 서비스 플랫폼입니다.
- 팬들은 크레딧을 통해 후원 및 투표를 하며, 자신이 좋아하는 아이돌을 차트 상위권에 올릴 수 있습니다.

<br>

## 팀원 구성
|                                                                              **이승현**                                                                               |                                                                              **최건**                                                                                |                                                                                 **이은빈**                                                                                  |                                                                                **김어진**                                                                                 |                                                                              **김승래**                                                                                |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|[<img src="https://avatars.githubusercontent.com/u/86544979?v=4" height=100> <br/> @codefug](https://github.com/codefug)| [<img src="https://avatars.githubusercontent.com/u/23397550?v=4" height=100> <br/> @Sombian](https://github.com/Sombian) | [<img src="https://avatars.githubusercontent.com/u/110139747?v=4" height=100> <br/> @eunbinnie](https://github.com/eunbinnie) | [<img src="https://avatars.githubusercontent.com/u/157278557?v=4" height=100> <br/> @Bellaeoeoo](https://github.com/Bellaeoeoo?tab=repositories) | [<img src="https://avatars.githubusercontent.com/u/160004698?v=4" height=100> <br/> @JustDevRae](https://github.com/JustDevRae) |


</div>

<br>

### 🛠️개발 환경
⚒️ Tech stack
<div style="display:flex">
  <a>
    <img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  </a>
  <a>
  	<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  </a>
  <a>
    <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  </a>
  <a>
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>
  </a>
  <a>
    <img src="https://img.shields.io/badge/Styledcomponents-DB7093?style=for-the-badge&logo=Styledcomponents&logoColor=white"/>
  </a>
  <a>
    <img src="https://img.shields.io/badge/React router-CA4245?style=for-the-badge&logo=Reactrouter&logoColor=white"/>
  </a>
  <a>
    <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  </a>
</div>


<br>

## 🗂️프로젝트 구조
**<img src="https://avatars.githubusercontent.com/u/168407736?s=200&v=4" height=20> <sup>**Fandom-K**<sup>**
```
📦src
    ├── main.jsx
    ├── main.scss
    ├── app/
    │   ├── index.js
    │   ├── index.scss
    │   └── pages/
    │       ├── MyPage/
    │       │   ├── index.jsx
    │       │   ├── index.scss
    │       │   └── widgets/
    │       │       ├── <이름>/
    │       │       │   ├── index.jsx
    │       │       │   └── index.scss
    │       │       └── ...
    │       ├── ListPage/
    │       │   ├── index.jsx
    │       │   ├── index.scss
    │       │   └── widgets/
    │       │       ├── <이름>/
    │       │       │   ├── index.jsx
    │       │       │   └── index.scss
    │       │       └── ...
    │       └── LandingPage/
    │           ├── index.jsx
    │           ├── index.scss
    │           └── widgets/
    │               ├── <이름>/
    │               │   ├── index.jsx
    │               │   └── index.scss
    │               └── ...
    └── common/
        ├── api/
        │   └── index.js
        ├── assets/
        │   ├── icons/
        │   │   ├── <이름.jsx>
        │   │   └── ...
        │   └── images/
        │       ├── <이름.png>
        │       ├── <이름.jpg>
        │       └── ...
        ├── hooks/
        │   ├── <이름.js>
        │   └── ...
        ├── models/
        │   ├── <이름.js>
        │   └── ...
        ├── utilities/
        │   ├── <이름.js>
        │   └── ...
        └── widgets/
            ├── <이름>/
            │   ├── index.jsx
            │   └── index.scss
            └── ...
```

<br>



## 📋작업 관리

- Notion를 사용하여 진행 상황을 공유했습니다.
- 매일 아침 9시에 회의를 통해 작업 순서와 방향성 및 계획에 대해 회의하고, 오후 5시에 개발한 것을 공유하며 GitHub를 통해 내용을 기록하며 작업했습니다.

<br>

## 🛠️페이지별 주요 기능

### 반응형

### Landing
- Modal : modal를 통해 landing페이지 뿐 아니라 모든 페이지의 이벤트 기반 상태를 관리하고, 객체 기반을 제어했으며, 함수형을 호출했습니다.

## ListPage
- compound Pattern : 민감도 제어, 행 설정 지정 가능 등 범용적으로 사용가능 한 컴포넌트를 작업했습니다.

- Infinite Scroll : interception observer를 이용하여 마지막 카드에 반응하여 커서에 기반한 fetch를 보내는 로직을 구현했습니다.

### MyPage
- swiper : 협재 슬라이드의 nextCursor 값을 설정하여 API 호출을 통해 추가 데이터를 가져오고 상태 업데이트 하며 swiper를 구현했습니다.
