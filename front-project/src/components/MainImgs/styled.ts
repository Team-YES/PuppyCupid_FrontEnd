import styled from "styled-components";

export const MainImgsWrapper = styled.div`
  position: static;

  .MainImgs_AllWrap {
    background-color: white;
    min-height: 100px;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #232323;
    color: rgb(255, 255, 255);
    display: grid;
    font-size: 14px;
    grid-template-columns: repeat(2, 1fr);
    position: relative;

    &:hover {
      cursor: url("/cursor-hover3.png") 16 16, auto;
    }
    /* 클릭 시 커서 변경 */
    &.clicked {
      cursor: url("/cursor-clicked3.png"), auto;
    }
  }

  .MainImgs_card {
    width: 100%;
    position: relative;
    z-index: 10;
  }
  .MainImgs_title {
    position: absolute;
    bottom: 30px;
    left: 30px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .MainImgs_card_imgbox {
    width: 100%;
    height: auto;
    box-sizing: border-box;
  }

  .MainImgs_card_imgbox img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  /* 반응형 CSS */
  @media (max-width: 480px) {
    .MainImgs_AllWrap {
      font-size: 14px;
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export const MainImgsPadding = styled.div`
  padding: 0px 120px;
  @media (max-width: 1024px) {
    padding: 0px 20px;
  }

  /* 강아지 */
  @keyframes walkRight {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(120vw);
    }
  }
  .MainImgs_puppy {
    padding-top: 80px;
    position: relative;
    z-index: 10;
  }

  .MainImgs_puppy_walk {
    display: flex;
    align-items: center;
    gap: 10px;
    position: absolute;
    bottom: 20px;
    left: -250px;
    animation: walkRight 13s linear infinite;
    pointer-events: none;
    z-index: 1;
  }
  .MainImgs_puppy {
    cursor: pointer;
  }
  // 강아지 뒤에 말풍선
  .MainImgs_AI_Wrap {
    background-color: white;
    padding: 8px 10px;
    border-radius: 8px;
    font-weight: bold;
    color: black;
    font-size: 13px;
    white-space: nowrap;
    border: 1px solid black;
    position: relative;
    z-index: 1;
    margin-right: 12px;
    cursor: pointer;
  }

  /* 테두리 꼬리 */
  .MainImgs_AI_Wrap::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -11px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 6.6px solid transparent;
    border-bottom: 6.6px solid transparent;
    border-left: 11px solid black;
    z-index: 0;
  }

  /* 말풍선 배경색 꼬리 (테두리 위에 올림) */
  .MainImgs_AI_Wrap::before {
    content: "";
    position: absolute;
    top: 50%;
    right: -9.6px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 10px solid white;
    z-index: 1;
  }

  .MainImgs_puppy_walk img {
    width: 100px;
    cursor: pointer;
  }
`;
