// Marker.js
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  width: 38px;
  height: 37px;
  background-image: url(https://icon-library.com/images/pin-icon-png/pin-icon-png-9.jpg);
  background-size: contain;
  background-repeat: no-repeat;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  cursor: grab;
`;

const Button = styled.div`
  height: 20px;
  margin: 15px auto;
  color: #fff;
  background-color: #34548f;
  border-color: #357ebd;
`;

const Box = styled.div`
  display: flex;
  width: 100px;
  height: 80px;

  position: absolute;
  border-radius: 10px;
  right: -30px;
  bottom: 35px;

  background-color: white;
  padding: 12px;
  box-shadow: 0 2px 7px 1px rgb(0 0 0 / 30%);
  flex-direction: column;
  align-items: center;
}
`;

const Marker = ({ text, onClick }) => (
  <Wrapper alt={text}>
    <Box>
      <p>Drag and Drop </p>
      <p>Or</p>
      <p>Click On Pin To</p>
      <p>Save Address</p>
      {/* <Button onClick={onClick}>Change</Button> */}
    </Box>
  </Wrapper>
);

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker;
