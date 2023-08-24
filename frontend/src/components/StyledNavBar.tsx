import React from "react";
import "../fonts.css";
import { useNavigate } from "react-router-dom";
import { userIdState, usernameState } from "../recoilState";
import { useRecoilState } from "recoil";
import * as styles from "../styles/StyledNavBarStyles";

const StyledNavBar: React.FC<StyledNavbarProps> = ({ brandImageSrc }) => {
  const navigate = useNavigate();
  const handleNavigate = (route: string) => {
    navigate(route);
  };

  const [recoilId, setRecoilId] = useRecoilState(userIdState);
  const [recoilName, setRecoilName] = useRecoilState(usernameState);

  const handleLogout = () => {
    setRecoilId(null);
    setRecoilName("Guest");
    localStorage.clear();
    handleNavigate("/");
  };

  return (
    <styles.NavbarContainer>
      <styles.BrandImage src={brandImageSrc} alt="Brand Image" onClick={() => handleNavigate("/")} />
      <styles.NavItems>
        <styles.NavName>{recoilName ? recoilName : "Guest"}</styles.NavName>
        {!recoilId && <styles.NavItem onClick={() => handleNavigate("/Login")}>Login</styles.NavItem>}
        <styles.NavItem onClick={() => handleNavigate("/Setup")}>Blitz</styles.NavItem>
        <styles.NavItem onClick={() => handleNavigate("/About")}>About</styles.NavItem>
        {recoilId && <styles.NavItem onClick={() => handleLogout()}>Logout</styles.NavItem>}
      </styles.NavItems>
    </styles.NavbarContainer>
  );
};

interface StyledNavbarProps {
  brandImageSrc: string;
}

export default StyledNavBar;
