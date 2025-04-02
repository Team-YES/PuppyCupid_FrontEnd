import styled from "styled-components";

type Props = {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
};

export const PostStyled = styled.div`
  padding: 12px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  width: 100%;
  display: flex;

  .Post_iconContainer {
    display: flex;
    margin-bottom: 15px;
  }
`;

export const Title = styled.div`
  font-size: 23px;
  font-weight: 700;
`;

export const Img = styled.div`
  border-radius: 50%;
`;

export const PostIcon = styled.i`
  font-size: 20px;
  color: #333;
  margin-right: 15px;
`;

export const MarginBtmDiv = styled.div`
  margin-bottom: 10px;
`;
