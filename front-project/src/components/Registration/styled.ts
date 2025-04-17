import styled from "styled-components";

// Button 컴포넌트 사용 시 variant 명시
interface ButtonProps {
  variant?: "default" | "confirm";
}

export const RegistrationStyled = styled.form`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 975px;
  margin: 0 auto;

  .Registration_LabelBox {
    padding: 15px;
  }

  .fa-solid.fa-camera-retro {
    color: ${(props) => props.theme.colors.pointPurple};
  }

  #img_upload {
    display: none;
  }

  .Registration_ImageBox {
    position: relative;
    width: 190px;
    height: auto;
    border-radius: 8px;
    /* margin: 15px; */
  }

  .Registration_BtnBox {
    display: flex;
    justify-content: flex-end;
    padding: 15px;
  }

  .Point {
    color: ${(props) => props.theme.colors.pointPurple};
  }

  .Registration_Textbox {
    margin-top: 15px;
    position: relative;
  }

  .Registration_writeCount {
    text-align: right;
    font-size: 13px;
    color: #999;
    position: absolute;
    bottom: 7px;
    right: 21px;
  }
`;

export const ImageScrollContainer = styled.div`
  padding: 15px;
  /* border: 1px solid #333;
  border-radius: 8px; */
`;

export const EditSwiperContainer = styled.div`
  padding: 35px 15px 15px 15px;
`;

export const ImageBox = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 841px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 592px) {
    width: 70px;
    height: 70px;
  }

  @media (max-width: 424px) {
    width: 65px;
    height: 65px;
  }
`;

export const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "variant",
})<ButtonProps>`
  border: none;
  border-radius: 6px;
  padding: 9px 19px;
  font-weight: 700;
  color: ${({ variant }) => (variant === "confirm" ? "#fff" : "#aaa")};
  background-color: ${({ variant }) =>
    variant === "confirm" ? "#9855f3" : "#eee"};
  cursor: pointer;
  margin-left: ${({ variant }) => (variant === "confirm" ? "14px" : "0")};

  &:hover {
    background-color: ${({ variant }) =>
      variant === "confirm" ? "#c7adff" : "#dfdfdf"};
  }
`;

export const ImgLabel = styled.label`
  width: 72px;
  display: block;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  background-color: #fff;

  @media (max-width: 592px) {
    width: 65px;
    padding: 12px;
  }

  &:hover {
    transition: 0.2s;
    box-shadow: 0 0 4px 2px #e9dffe !important;
  }

  .Registration_count {
    font-size: 14px;
  }

  i {
    font-size: 19px;
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 6px;
  font-size: 14px;
  color: red;
`;

export const XBtn = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  cursor: pointer;
`;
