import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const Modals = ({ children, onCloseModal, isOpen = false }) => {
  return (
    <Modal open={isOpen} onClose={onCloseModal} center focusTrapped={false}>
      {children}
    </Modal>
  );
};
export default Modals;
