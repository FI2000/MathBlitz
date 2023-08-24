import styled from "styled-components";

export const NavbarContainer = styled.nav`
  background: linear-gradient(to left, coral 50%, white, white);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BrandImage = styled.img`
  width: 24rem;
  height: 5rem;
`;

export const NavItems = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
`;

export const NavItem = styled.li`
  cursor: pointer;
  font-family: "PixelFont", cursive;
  font-weight: bold;
  font-size: 18px;

  transition: color 0.3s;

  &:hover {
    color: black;
  }
`;

export const NavName = styled.li`
  font-family: "PixelFont", cursive;
  font-weight: bold;
  font-size: 18px;
  color: black;
`;
