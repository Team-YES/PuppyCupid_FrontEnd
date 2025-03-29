import styled from "styled-components";

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: white;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const Nav = styled.nav`
  display: flex;
`;

export const MenuItem = styled.a`
  margin-left: 20px;
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
