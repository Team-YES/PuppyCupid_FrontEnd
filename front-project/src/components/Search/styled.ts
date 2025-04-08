import styled from "styled-components";

export const SearchStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 25px;
  /* border-top: 1px solid #333; */
`;

export const SearchInput = styled.input`
  border: none;
  background-color: rgb(242, 242, 242);
  border-radius: 20px;
  width: 100%;
  padding: 7px 13px 7px 37px;

  &:focus {
    outline-color: #ccb6fd;
  }
`;

export const SearchIconBox = styled.div`
  font-size: 17px;
  color: #aeadad;
  margin-left: 11px;
  position: absolute;
  top: 7px;
`;

export const SearchOverlay = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: gray;
  z-index: 10;
`;
