import styled from "styled-components";

// Button 컴포넌트 사용 시 variant 명시
interface ButtonProps {
  variant?: "default" | "confirm" | "danger";
}

export const RegistrationStyled = styled.form`
  width: 100%;
  border: 1px solid #333;
`;

export const Image = styled.div`
  width: 100%;
`;

export const DeleteImage = styled.div``;

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "variant",
})<ButtonProps>`
  border: 1px solid #333;
  border-radius: 6px;
  padding: 6px 19px;
  color: ${({ variant }) => (variant === "default" ? "#333" : "#fff")};
  background-color: ${({ variant }) =>
    variant === "confirm"
      ? "#007bff"
      : variant === "danger"
      ? "#dc3545"
      : "#fff"};
  cursor: pointer;

  &:hover {
    background-color: ${({ variant }) =>
      variant === "confirm"
        ? "#0056b3"
        : variant === "danger"
        ? "#c82333"
        : "#e6e6e6"};
  }
`;

export const ImgLabel = styled.label`
  display: block;
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  background-color: #f9f9f9;
`;
