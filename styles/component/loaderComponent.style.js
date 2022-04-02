import styled, { css } from "styled-components";

export const LoaderSection = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 9999;
  display: flex;
  background: rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;

  .cos_circleView {
    justify-content: center;
    align-items: center;
    display: flex;
    width: 100%;
    height: 100%;

    /* ${(props) =>
      props.isDetailLoader &&
      css`
        background: transparent !important;
      `}
    ${(props) =>
      props.isUserListLoader &&
      css`
        background: transparent !important;
      `}
      ${(props) =>
      props.isImageLoader &&
      css`
        background: transparent;
        width: 60px !important;
        position: absolute;
        top: 0px;
        left: calc(50% - 35px);
      `}

    svg {
      fill: #c5244b !important;
      @include media-breakpoint-down-sm {
        width: 40px;
      }
    } */
  }
  ${(props) =>
    props.isDetailLoader &&
    css`
      position: absolute;
    `}
  ${(props) =>
    props.isUserListLoader &&
    css`
      position: unset;
    `}
  ${(props) =>
    props.isImageLoader &&
    css`
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin-right: 0;
      margin: 0 auto;
      max-width: 30px;
      height: auto;
      width: 100%;
      z-index: unset;
    `}
`;
