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
`;
