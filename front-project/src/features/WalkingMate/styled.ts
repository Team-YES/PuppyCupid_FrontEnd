import { theme } from "antd";
import styled from "styled-components";

export const WalkingMateStyled = styled.div`
  .WalkingMate_Info_wrap {
    width: 100%;
    height: calc(100vh - 130px);
    display: flex;
    padding: 0px 5px 0px 35px;
    position: relative;
    margin-bottom: 55px;
    img {
      width: 65%;
      height: auto;
      object-fit: contain;
    }
  }
  .WalkingMate_Info_Textwrap {
    position: absolute;
    right: 75px;
    top: 60px;
    h5 {
      font-size: 13px;
      color: gray;
      padding-left: 5px;
      margin: 0px;
    }
    h1 {
      font-size: 50px;
      font-weight: bold;
      margin: 5px 0px 5px 0px;
      display: flex;
      flex-direction: column;
    }
    h3 {
      margin: 10px 0px 10px 5px;
      font-size: 15px;
      line-height: 1.5;
      color: gray;
      display: flex;
      flex-direction: column;
    }
    h3 span:first-child {
      font-weight: bold;
      font-size: 16px;
      color: black;
    }
  }
  /* 반응형 1024 */
  @media (max-width: 1024px) {
    .WalkingMate_Info_wrap {
      flex-direction: column;
      padding: 10px 10px 10px 10px;
      align-items: center;
      height: auto;
      img {
        width: 100%;
        max-width: 400px;
      }
    }

    .WalkingMate_Info_Textwrap {
      position: static;
      text-align: center;
      margin-top: 20px;

      h1 {
        font-size: 36px;
      }

      h3 {
        font-size: 14px;

        span:first-child {
          font-size: 15px;
        }
      }

      h5 {
        font-size: 12px;
      }
    }
  }
  /* 반응형 767 */
  @media (max-width: 767px) {
    .WalkingMate_Info_Textwrap {
      h1 {
        font-size: 28px;
      }

      h3 {
        font-size: 13px;

        span:first-child {
          font-size: 14px;
        }
      }

      h5 {
        font-size: 11px;
      }
    }
  }
  .WalkingMate_List_Title {
    width: 100%;
    height: 80px;
    padding: 0px 30px;
    margin-bottom: 35px;
    font-size: 23px;
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.softPurple};
    display: flex;
    justify-content: center;
    align-items: center;
    // 반응형
    @media (max-width: 768px) {
      font-size: 18px;
      height: 70px;
      padding: 0px 20px;
    }

    @media (max-width: 480px) {
      font-size: 16px;
      height: 60px;
      padding: 0px 15px;
    }
  }
`;

// 카드 디자인
export const WalkingMateCard = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0 auto;
    max-width: 900px;
    justify-content: center;
  }

  li {
    width: 280px;
    height: 280px;
    margin-bottom: 50px;
    perspective: 1000px;
    list-style: none;
  }

  .WalkingMate_card {
    width: 100%;
    height: 100%;
    position: relative;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .WalkingMate_card.flip {
    transform: rotateY(180deg);
  }

  .WalkingMate_card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .WalkingMate_card-front {
    z-index: 2;
  }

  .WalkingMate_card-back {
    transform: rotateY(180deg);
  }

  .WalkingMate_card-img-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .WalkingMate_card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  .WalkingMate_card-name-overlay {
    position: absolute;
    text-align: center;
    bottom: -45px;
    padding: 15px 12px;
    font-weight: bold;
  }
  .no-dogs-message {
    text-align: center;
    font-size: 16px;
    color: #999;
    margin-top: 40px;
    line-height: 1.6;
  }
  @media (hover: hover) and (pointer: fine) {
    /* 데스크탑: hover로 뒤집힘 */
    li:hover .WalkingMate_card {
      transform: rotateY(180deg);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
  }
  /* 채팅하기 버튼 */
  .WalkingMate_chat-button {
    margin-top: 10px;
    background-color: ${({ theme }) => theme.colors.pointPurple};
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    text-align: center;
  }
`;
