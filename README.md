# Fandom-K



<br>

### 🗓 개발 기간
2024.04.30 ~ 2024.05.17

<br>

## 프로젝트 소개

- Fandom-K는 자신이 좋아하는 아이돌을 선택하고 후원하는 서비스 플랫폼입니다.

<br>

## 팀원 구성

<div align="center">

|                                                       **이승현**                                                       | **최건** | **김어진** | **이은빈** | **김승래** |
| :--------------------------------------------------------------------------------------------------------------------: | :------: | :--------: | :--------: | :--------: |
| <a href="https://github.com/codefug"><img src="https://github.com/codefug.png" width=150 height=150/><br/>@codefug</a> |          |            |            |            |

</div>

<br>

### 개발 환경
---
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

## 2. 채택한 개발 기술과 브랜치 전략

### React, styled-component

- React
    - 컴포넌트화를 통해 추후 유지보수와 재사용성을 고려했습니다.
    - 유저 배너, 상단과 하단 배너 등 중복되어 사용되는 부분이 많아 컴포넌트화를 통해 리소스 절약이 가능했습니다.
- styled-component
    - props를 이용한 조건부 스타일링을 활용하여 상황에 알맞은 스타일을 적용시킬 수 있었습니다.
    - 빌드될 때 고유한 클래스 이름이 부여되어 네이밍 컨벤션을 정하는 비용을 절약할 수 있었습니다.
    - S dot naming을 통해 일반 컴포넌트와 스타일드 컴포넌트를 쉽게 구별하도록 했습니다.


### eslint, prettier

- 정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.
- 코드 품질 관리는 eslint에, 코드 포맷팅은 prettier에 일임해 사용했습니다.
- airbnb의 코딩 컨벤션을 참고해 사용했고, 예외 규칙은 팀원들과 협의했습니다.
- 협업 시 매번 컨벤션을 신경 쓸 필요 없이 빠르게 개발하는 데에 목적을 두었습니다.

### 브랜치 전략

- Git-flow 전략을 기반으로 main, develop 브랜치와 feature 보조 브랜치를 운용했습니다.
- main, develop, Feat 브랜치로 나누어 개발을 하였습니다.
    - **main** 브랜치는 배포 단계에서만 사용하는 브랜치입니다.
    - **develop** 브랜치는 개발 단계에서 git-flow의 master 역할을 하는 브랜치입니다.
    - **Feat** 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제해주었습니다.

<br>

## 3. 프로젝트 구조



<br>

## 4. 역할 분담

### 🍊이승현

- **UI**
    - 페이지 : 목록 페이지, 모달
- **기능**
    - infinite scroll, async 동작 처리 함수, 투표 Post 처리

<br>

## 5. 작업 관리

- GitHub Projects와 Issues를 사용하여 진행 상황을 공유했습니다.
- 주간회의를 진행하며 작업 순서와 방향성에 대한 고민을 나누고 GitHub Wiki에 회의 내용을 기록했습니다.

<br>

## 6. 신경 쓴 부분


<br>

## 7. 페이지별 기능

### 반응형

### Landing

### ListPage

### MyPage

<br>

## 8. 트러블 슈팅

<br>

## 9. 개선 목표

<br>

## 10. 프로젝트 후기

### 🍊 이승현

기술적으로 알아가는 것들도 많았지만 무엇보다 협업 과정에서 겪는 갈등, 커뮤니케이션 스킬 같은 것들을 많이 알아갔던 프로젝트였던 거 같습니다. 개인 업무에서 문제를 마주할 때마다 기록하고 검색해보고 해결해나갔지만 협업과정에서 문제를 마주할 때는 어떻게 검색해야 답이 나올지 한참 생각했던 기억이 있습니다. 결과적으로는 잘 조율되어 완성까지 되어서 좋은 경험으로 남았습니다.

<br>
