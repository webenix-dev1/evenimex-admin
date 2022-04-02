import styled, { css } from "styled-components";
import theme from "../global/theme";
import { mediaQueries } from "../../utils/mediaQuery";

export const HeaderBarMain = styled.div`
  padding: 12px 0;
  background: linear-gradient(
    90deg,
    ${theme.color.gredientFirst},
    ${theme.color.gredientSecond}
  );
  box-shadow: 0 0 50px 0 ${theme.color.gredientFirst};
  position: fixed;
  top: 0;
  z-index: 2;
  left: 0;
  right: 0;
  width: 100%;
`;
export const NavBarMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const NavLogo = styled.div`
  display: block;
`;
export const NavBarLogo = styled.div`
  cursor: pointer;
  width: 138px;
  height: auto;
  display: inline-flex;
  overflow: hidden;
  ${mediaQueries("sm")`
    width:138px;
  `}
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    object-position: center;
  }
`;
