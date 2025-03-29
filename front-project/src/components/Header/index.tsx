import React from "react";
import { HeaderWrapper, Nav, Logo, MenuItem } from "./styled";

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Logo>My Website</Logo>
      <Nav>
        <MenuItem>Home</MenuItem>
        <MenuItem>About</MenuItem>
        <MenuItem>Contact</MenuItem>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
