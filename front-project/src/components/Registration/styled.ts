import styled from "styled-components";

// Button 컴포넌트 사용 시 variant 명시
interface ButtonProps {
  variant?: "default" | "confirm" | "danger";
}

export const RegistrationStyled = styled.form`
  width: 100%;
  border: 1px solid #333;

  .Registration_LabelBox {
    padding: 15px;
  }

  .fa-solid.fa-camera-retro {
    color: #9855f3;
  }

  #img_upload {
    display: none;
  }

  .Registration_ImagesContainer {
    display: flex;
    flex-wrap: wrap;
  }

  .Registration_ImageBox {
    position: relative;
    width: 190px;
    height: auto;
    border-radius: 8px;
    margin: 15px;
  }

  .Registration_Img {
    width: 100%;
    border-radius: 8px;
  }

  .Registration_BtnBox {
    display: flex;
    justify-content: flex-end;
    padding: 15px;
  }
`;

export const Image = styled.div`
  width: 100%;
`;

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "variant",
})<ButtonProps>`
  border: 1px solid #333;
  border-radius: 6px;
  padding: 6px 19px;
  color: ${({ variant }) => (variant === "danger" ? "#fff" : "#333")};
  background-color: ${({ variant }) =>
    variant === "confirm"
      ? "#ccb6fd"
      : variant === "danger"
      ? "#dc3545"
      : "#fff"};
  cursor: pointer;
  margin-left: ${({ variant }) => (variant === "confirm" ? "14px" : "0")};

  &:hover {
    background-color: ${({ variant }) =>
      variant === "confirm"
        ? "#bc9dff"
        : variant === "danger"
        ? "#c82333"
        : "#e6e6e6"};
  }
`;

export const ImgLabel = styled.label`
  width: 72px;
  display: block;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.softPurple};

  .Registration_count {
    font-size: 14px;
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
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
