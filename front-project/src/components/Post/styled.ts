import styled from "styled-components";

type Props = {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
};

export const PostStyled = styled.div`
  padding: 25px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const Title = styled.div`
  font-size: 23px;
  font-weight: 700;
`;

export const Img = styled.div`
  border-radius: 50%;
`;

export const Writer = styled.div`
  font-size: 12px;
`;
