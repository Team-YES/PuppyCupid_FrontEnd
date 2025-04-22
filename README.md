# 🐶 소개팅 – GPS 기반 반려동물 친구 만들기 서비스

## 🚀 프로젝트 소개
* "소개팅"은 GPS 기반으로 주변 반려동물 친구를 찾아주고,
산책을 함께할 친구를 매칭해주는 반려동물 소개팅 웹 서비스입니다.

## ☁️ 배포 링크 (수정 예정)
* 🔗 서비스 주소: https://소개팅.com
* 🌐 프론트 배포 서버: AWS EC2 (Next.js)
* 🛠 백엔드 서버: AWS EC2 (NestJS)
* 💾 DB: AWS RDS (MySQL)

## 🎥 서비스 미리보기

아래는 **소개팅**의 주요 화면을 미리 볼 수 있는 GIF 이미지입니다.  
각 페이지의 UI 및 기능을 확인해보세요!

## 📌 목차

## 📆 프로젝트 기간 및 팀 구성

- 기간: 2025.03.31 ~ 2025.04.25 (약 4주)
- 팀원: 프론트엔드 2명 / 백엔드 1명 (총 3명)

## :busts_in_silhouette: Developers

| FE. 김은주                          | FE. 최승연                                  | FE. 최유진                              |
| ----------------------------------- | ------------------------------------------- | --------------------------------------- |
| [ounjuu](https://github.com/ounjuu) | [werther901](https://github.com/werther901) | [yujeen02](https://github.com/yujeen02) |



## 🎯 개발 동기
* 반려동물 간의 사회성을 길러주기 위한 서비스입니다.
* 매칭 서비스와 채팅 서비스로 보호자 간의 실질적인 교류와 만남의 장을 제공합니다.
* 단순 정보 공유를 넘어선 위치 기반 실시간 커뮤니티입니다.

## 🗂️ DB 설계도

## 🧾 API 명세서

## 🖥️ 주요 기능
- 📍 GPS 기반 친구 찾기  
- 💬 실시간 채팅 및 팔로우 기능
- 💛 소셜 로그인 및 좋아요 기능
- 📢 게시물 및 댓글, 대댓글 작성 기능
- 🐶 반려동물 프로필 등록 및 조회  
- 🙋 마이페이지 - 내 정보, 알림 확인 등

## ⚙️ 기술 스택
- **🛠️ Frontend**: Next.js, TypeScript, Redux-toolkit, React Query, styled-components
- **🛠️ Backend**: Nest.js, TypeORM, MySQL, JWT
- **🛠️ DevOps**: AWS EC2, Nginx, PM2
- **🛠️ Others**: OAuth (Kakao, Naver, Google), Formik, Yup, Figma, Notion

## 📌 기능 정의서
- 📋 기능 정의서
<img width="700" alt="image" src="https://github.com/user-attachments/assets/8484daff-5d18-45bd-a178-7a61a78d9116" />


## 🏠 메인 페이지

## 🔑 로그인 페이지

## 📂 프로젝트 구조(수정필요)

```markdown
assets : 이미지 파일 집합
components : 재사용 가능한 컴포넌트 집합
template : 페이지를 만들 수 있도록 컴포넌트/레이아웃 주입
pages : 유저가 보는 실제 콘텐츠
style : 공통 스타일드 컴포넌트, reset.css, 프로젝트 컬러 상수화

project-root
├─📂public
└─📂src
├─📂assets
├─📂components
│ ├─📂animalBox
│ ├─📂button
│ ├─📂comment
│ └─📂user
├─📂constants
├─📂context
├─📂features
│ └─📂fonts
├─📂hooks
│ ├─📂chat
│ ├─📂follow
│ ├─📂homePost
│ ├─📂login
│ ├─📂main
├─📂postDetail
└─📂walkingFeed
```
