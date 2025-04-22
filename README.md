# 🐶 소개팅 – GPS 기반 반려동물 친구 만들기 서비스

## 🚀 프로젝트 소개

- 소개팅은 GPS 기반으로 주변 반려동물 친구를 찾아주고,
  산책을 함께할 친구를 매칭해주는 반려동물 소개팅 웹 서비스입니다.

## ☁️ 배포 링크 (수정 예정)

- 🔗 소개팅 홈페이지 주소: http://43.201.114.228/
- 🔗 관리자 페이지 주소: http://43.203.242.14
- 🌐 프론트 배포 서버: AWS EC2 (Next.js)
- 🛠 백엔드 서버: AWS EC2 (NestJS)
- 💾 DB: AWS (MySQL)

## 🎥 서비스 미리보기

- 아래는 **소개팅**의 주요 화면을 미리 볼 수 있는 이미지입니다.  
  각 페이지의 UI 및 기능을 확인해보세요!

<table>
  <tr>
    <td align="center">
      <strong>메인 페이지</strong><br><br>
      <img src="https://github.com/user-attachments/assets/9ee8d7db-5647-4c46-92b0-14316b3d3949" alt="real-time-chat" width="280" height="250">
    </td>
    <td align="center">
      <strong>전체 게시물</strong><br><br>
      <img src="https://github.com/user-attachments/assets/c5e59416-c6ff-4fd0-89da-8b6b52652b44" alt="report-post" width="280" height="250">
    </td>
    <td align="center">
       <strong>상세 게시물</strong><br><br>
      <img src="https://github.com/user-attachments/assets/5ba43f33-d9b9-4332-a8fa-d55677fcdb21" width="280" height="250">
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>채팅하기</strong><br><br>
      <img src="https://github.com/user-attachments/assets/e6d3f330-0ae4-47d8-83cd-d55063b688ca" alt="leave-chat" width="280" height="250">
    </td>
    <td align="center">
      <strong>내 정보 보기</strong><br><br>
      <img src="https://github.com/user-attachments/assets/621eb33f-cd39-4a8f-8f0a-66253df2b165" alt="edit-profile" width="280" height="250">
    </td>
     <td align="center">
      <strong>산책 메이트 & AI 매칭</strong><br><br>
       <img alt="profile-page" src="https://github.com/user-attachments/assets/8b08b489-aa37-4d95-b706-2578f7e162ec" width="280" height="250"/>
    </td>
  </tr>
   <tr>
    <td align="center">
      <strong>소셜 로그인</strong><br><br>
      <img src="https://github.com/user-attachments/assets/b6287ced-0ae8-4255-b13a-972374881156" alt="leave-chat" width="280">
    </td>
    <td align="center">
      <strong>신고하기 & 문의하기</strong><br><br>
      <img src="" alt="edit-profile" width="280">
    </td>
     <td align="center">
      <strong>ADMIN</strong><br><br>
       <img alt="profile-page" src="" width="280"/>
    </td>
  </tr>
</table>


## 📌 목차

## 📆 프로젝트 기간 및 팀 구성

- 기간: 2025.03.31 ~ 2025.04.25 (약 4주)
- 팀원: 프론트엔드 2명 / 백엔드 1명 (총 3명)

## :busts_in_silhouette: Developers

| FE. 김은주                          | FE. 최승연                                  | BE. 최유진                              |
| ----------------------------------- | ------------------------------------------- | --------------------------------------- |
| [ounjuu](https://github.com/ounjuu) | [werther901](https://github.com/werther901) | [yujeen02](https://github.com/yujeen02) |

## 🎯 개발 동기

- 반려동물 간의 사회성을 길러주기 위한 서비스입니다.
- 위치 기반 매칭 및 채팅 기능을 통해 보호자 간의 실질적인 교류와 만남의 장을 제공합니다.
- 단순 정보 공유를 넘어선 실시간 소통이 가능한 커뮤니티 플랫폼입니다.

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

## 🗂️ DB 설계도

## 🧾 API 명세서

## 📱 Figma 디자인

<img width="700" alt="소개팅_피그마" src="https://github.com/user-attachments/assets/eed6acda-18cc-4bab-9f32-21d0a6d2e1d3" />

## 📋 기능 정의서

<img width="700" alt="image" src="https://github.com/user-attachments/assets/8484daff-5d18-45bd-a178-7a61a78d9116" />

## 주요 기능 소개

### 🏠 메인 페이지

- 메인 페이지에서는 이벤트 창 확인, MBTI 매칭 서비스 이용, 다른 페이지로 이동이 가능합니다.

### 🔑 로그인 / 추가 정보 입력

- 소셜 로그인 기능을 제공합니다. (카카오, 네이버, 구글)
- 최초 로그인 시 반드시 사용자 정보를 추가로 입력하도록 구현하였습니다.

### 💳 결제 페이지

- 프리미엄 매칭 등 유료 기능 제공을 위한 결제 페이지입니다.
- Toss Payments API를 활용하여 구현하였습니다.
- 결제 성공 또는 실패 시 각각의 결과 페이지로 이동합니다.

### 🤖 AI 매칭

- AI 알고리즘을 통해 반려동물의 MBTI 및 성격을 분석하여, 잘 맞는 친구를 추천합니다.
- GPS 기반으로 주변 친구를 추천합니다.
- 채팅 신청이 가능합니다.

### 🐾 산책메이트

- 현재 위치를 기준으로 근처에 있는 산책 친구들을 찾아볼 수 있습니다.
- 원하는 상대에게 채팅 신청을 보내 실시간으로 대화를 시작할 수 있습니다.

### 📝 게시글 등록 / 수정

- 자유롭게 게시글을 작성하고 수정할 수 있는 커뮤니티 기능을 제공합니다.
- 반려동물용품에 대한 후기, 일상 공유 등 다양한 주제로 소통이 가능합니다.

### 📌 전체게시판

- 날씨 API를 활용하여 접속한 위치에 맞는 실시간 날씨 정보를 산책과 관련된 문구로 제공합니다.
- 로그인 한 모든 사용자는 게시판에 올라온 게시글을 열람할 수 있습니다.
- 게시글 제목 검색을 통해 원하는 게시글을 찾을 수 있습니다.
- 게시물 상세 페이지 확인이 가능합니다.
- 댓글 기능, 대댓글 기능, 좋아요 기능을 제공합니다.
- 무한 스크롤로 게시글을 계속해서 확인할 수 있습니다.
- 게시물을 신고할 수 있는 기능을 제공합니다.
- 게시물 작성 페이지로 이동할 수 있습니다.
- 카카오 API를 이용한 게시물 공유 기능이 제공됩니다.

### 👀 OtherProfile

- 반려동물의 프로필이나 다른 사람의 게시글을 모아서 볼 수 있는 기능을 제공합니다.
- 팔로우 버튼을 클릭하여 다른 사용자를 팔로우하거나 팔로우를 취소할 수 있습니다.
- 메시지 보내기 기능을 통해 다른 사용자에게 직접 메시지를 보낼 수 있습니다.
- 무한 스크롤 기능을 통해 게시글을 계속해서 자동으로 불러옵니다.
- 팔로워, 팔로우 목록을 확인할 수 있는 기능을 제공합니다.

### 🙋‍♂️ MyProfile

- 회원 정보 및 강아지 프로필을 수정할 수 있는 기능을 제공합니다.
- 내가 작성한 게시글, 좋아요를 누른 게시글을 확인할 수 있는 기능을 제공합니다.
- 받은 알림을 확인할 수 있는 기능을 제공합니다.
- 회원권 정보를 확인할 수 있는 기능을 제공합니다.
- 회원 탈퇴 기능을 제공합니다.
- 무한 스크롤 기능을 통해 게시글을 계속해서 자동으로 불러옵니다.
- 팔로워, 팔로우 목록을 확인할 수 있는 기능을 제공합니다.
- 게시글의 상세 페이지를 확인할 수 있는 기능을 제공합니다.
- 게시글에 호버 시 댓글 및 좋아요 개수를 확인할 수 있는 기능을 제공합니다.

### 💬 채팅

- 실시간으로 메시지를 주고받을 수 있는 기능을 제공합니다.
- 채팅방을 신고할 수 있는 기능을 제공합니다.
- 채팅 삭제 기능을 제공합니다.
- 반반응형 디자인에 따라 다른 UI를 제공합니다.

### ❓ 문의하기

- 서비스 관련 질문을 접수할 수 있는 기능을 제공합니다.
- 환불 문의를 접수할 수 있는 기능을 제공합니다.
- 관리자 페이지에서 문의 내용을 관리할 수 있는 기능을 제공합니다.

### 🚨 신고하기

- 부적절한 사용자 또는 게시글, 댓글을 신고할 수 있는 기능을 제공합니다.
- 신속한 조치를 위한 신고 사유를 입력할 수 있는 기능을 제공합니다.

### 🛠 admin

- 관리자 전용 페이지입니다.
- 통계 자료를 표시할 수 있는 기능을 제공합니다.
- 회원 정보, 신고 정보, 문의 정보를 확인할 수 있는 기능을 제공합니다.
- 블랙리스트를 관리할 수 있는 기능을 제공합니다.

## 📂 프로젝트 구조

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
│ ├─📂ChatLeft
│ ├─📂ChatMiddle
│ ├─📂ChatRight
│ ├─📂Mypostcount
│ ├─📂Otherpostcount
│ ├─📂PuppyProfile
│ └─📂RightMenubar
├─📂components
│ ├─📂AlertList
│ ├─📂Comments
│ ├─📂DetailPost
│ ├─📂EditPost
│ ├─📂EditPostModal
│ ├─📂EventPopup
│ ├─📂Footer
│ ├─📂Header
│ ├─📂InputComp
│ ├─📂KakaoShare
│ ├─📂Loading
│ ├─📂MainImgs
│ ├─📂Matches
│ ├─📂PersonForm
│ ├─📂Post
│ ├─📂Postlist
│ ├─📂PuppyForm
│ ├─📂PuppyFormFix
│ ├─📂Registration
│ ├─📂ReplyComment
│ ├─📂ReportModal
│ ├─📂Search
│ ├─📂SelectBox
│ ├─📂TextAreaComp
│ ├─📂UsersModal
│ ├─ BlacklistRoute.tsx
│ ├─ PowerUserRoute.tsx
│ └─ PrivateRoute.tsx
├─📂constants
│ ├─ formLabels.ts
│ ├─ mbtiOptions.ts
│ ├─ personalities.ts
│ └─ weatherData.ts
├─📂context
│ └─ AuthContext.tsx
├─📂features
│ ├─📂Board
│ ├─📂Chat
│ ├─📂Help
│ ├─📂MainPageManager
│ ├─📂MyPage
│ ├─📂OtherPage
│ ├─📂PaymentManager
│ ├─📂Phone
│ ├─📂PostRegistration
│ └─📂fonts
├─📂hooks
│ ├─ useAppDispatch.ts
│ ├─ useClickOutside.ts
│ └─ useMyDog.ts
├─📂lib
│ └─ axios.ts
├─📂pages
│ ├─📂api
│ ├─📂board
│ ├─📂chat
│ ├─📂help
│ ├─📂login
│ ├─📂mypage
│ ├─📂otherpage
│ ├─📂payment
│ ├─📂phone
│ ├─📂post_edit
│ ├─📂post_registration
│ ├─📂walkingmate
│ ├─ app.tsx
│ ├─ document.tsx
│ └─ index.tsx
├─📂reducers
│ ├─ dogSlice.ts
│ ├─ getAllPostsSlice.ts
│ ├─ getChatUsersSlice.ts
│ ├─ getCommentSlice.ts
│ ├─ getInfinitePostsSlice.ts
│ ├─ getLikeSlice.ts
│ └─ userSlice.ts
├─📂store
├─📂styles
├─📂utils
│ ├─ api.ts
│ ├─ formatDate.ts
│ ├─ formatNumberWithComma.ts
│ ├─ getCookie.ts
│ ├─ isBlackListed.ts
└─── setCookie.ts
```
