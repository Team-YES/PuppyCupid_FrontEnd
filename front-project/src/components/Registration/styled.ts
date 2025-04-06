import styled from "styled-components";

// Button 컴포넌트 사용 시 variant 명시
interface ButtonProps {
  variant?: "default" | "confirm" | "danger";
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
`;

export const ImageScrollContainer = styled.div`
  padding: 15px;
  /* border: 1px solid #333;
  border-radius: 8px; */
`;

export const ImageBox = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
`;

export const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "variant",
})<ButtonProps>`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 19px;
  font-weight: 700;
  color: ${({ variant }) => (variant === "danger" ? "#333" : "#fff")};
  background-color: ${({ variant }) =>
    variant === "confirm"
      ? "#9855f3"
      : variant === "danger"
      ? "#dc3545"
      : "#fff"};
  cursor: pointer;
  margin-left: ${({ variant }) => (variant === "confirm" ? "14px" : "0")};

  &:hover {
    background-color: ${({ variant }) =>
      variant === "confirm"
        ? "#ccb6fd"
        : variant === "danger"
        ? "#c82333"
        : "#e6e6e6"};
  }
`;

export const ImgLabel = styled.label`
  width: 72px;
  display: block;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 14px;
  text-align: center;
  cursor: pointer;
  background-color: #fff;

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
