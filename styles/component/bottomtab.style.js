import styled, { css } from "styled-components";
import theme from "../global/theme";
import { mediaQueries } from "../../utils/mediaQuery";
// footer section css file start//
export const FooterBarMain = styled.div`
  background: linear-gradient(
    90deg,
    ${theme.color.gredientFirst},
    ${theme.color.gredientSecond}
  );
  padding: 10px 0;
  z-index: 3;
  position: sticky;
  width: 100%;
  bottom: 0px;
`;
export const TabMenuMain = styled.div`
  display: block;
  width: 100%;
`;
export const TabMenuUl = styled.ul`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  ${mediaQueries("md")`
        justify-content: space-between;
    `}
`;
export const TabMenuLi = styled.li`
  padding: 0 55px;
  position: relative;
  cursor: pointer;
  ${mediaQueries("md")`
       padding: 0 28px;
    `}
  ${mediaQueries("sm")`
       padding: 0 15px;
    `}
    

    &.fill_icon {
    svg {
      fill: ${theme.color.ButtonBgColorOne};
      g {
        fill: ${theme.color.ButtonBgColorOne};
        g {
          fill: ${theme.color.ButtonBgColorOne};
        }
      }
    }
  }
  svg {
    width: 22px;
    height: 22px;
  }
  .Meement_Icon {
    svg {
      width: 36px;
      height: 36px;
      ${mediaQueries("sm")`
        width: 32px;
        height: 32px;
    `}
    }
  }
`;
export const NotifactionCount = styled.span`
  background: #ff0000;
  border: 2px solid ${theme.color.white};
  font-weight: 600;
  font-size: 12px;
  color: ${theme.color.white};
  padding: 4px;
  border-radius: 100px;
  position: absolute;
  top: -12px;
  width: 28px;
  height: 28px;
  text-align: center;
  ${mediaQueries("sm")`
    width: 26px;
    height: 26px;
    font-size: 10px;
    `}
`;
