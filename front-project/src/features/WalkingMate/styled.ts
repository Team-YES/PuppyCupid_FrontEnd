import { theme } from "antd";
import styled from "styled-components";

export const WalkingMateStyled = styled.div`
  .WalkingMate_Info_wrap {
    width: 100%;
    height: calc(100vh - 130px);
    display: flex;
    padding: 0px 5px 0px 35px;
    position: relative;
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
      /* color: ${({ theme }) => theme.colors.pointPurple}; */
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

  /* ✅ 반응형: 태블릿 이하 */
  @media (max-width: 1024px) {
    .WalkingMate_Info_wrap {
      flex-direction: column;
      padding: 10px 10px 55px 10px;
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

  /* ✅ 반응형: 모바일 이하 */
  @media (max-width: 600px) {
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
`;
