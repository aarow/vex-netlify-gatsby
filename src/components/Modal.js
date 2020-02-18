import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const overlayRoot = document.createElement("div");
document.body.appendChild(overlayRoot);
const modalRoot = document.createElement("div");
document.body.appendChild(modalRoot);

export default ({ trigger, content }) => {
  const [showModal, toggleModal] = useState(false);

  const updateModal = () => {
    toggleModal(!showModal);
  };

  useEffect(() => {
    if (showModal) {
      document.querySelector("html").style.overflow = "hidden";
    } else {
      document.querySelector("html").style.overflow = null;
    }
  }, [showModal]);

  return (
    <>
      {/* {showModal && <Overlay showModal={showModal} />} */}
      <Trigger updateModal={updateModal}>{trigger}</Trigger>

      <ModalContainer showModal={showModal}>
        {content}
        <CloseButton closeModal={updateModal}></CloseButton>
      </ModalContainer>
    </>
  );
};

const ModalContainer = ({ children, onClose, showModal }) => {
  return createPortal(
    <AnimatePresence>
      {showModal && (
        <motion.div
          {...modalAnimateOptions}
          className="modal-container position-fixed overflow-auto bg-white"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot
  );
};

const CloseButton = ({ closeModal }) => (
  <button
    type="button"
    className="border-white bg-dark d-flex align-items-center justify-content-center"
    onClick={closeModal}
    style={{
      position: "absolute",
      right: "0",
      top: "0",
      width: "3rem",
      height: "3rem"
    }}
  >
    <span className="sr-only">Close</span>
    <span className="text-light h1 m-0" style={{ lineHeight: 0.01 }}>
      &times;
    </span>
  </button>
);

const Trigger = ({ children, updateModal }) => (
  <div onClick={updateModal}>{children}</div>
);

const modalAnimateOptions = {
  initial: {
    scale: 2,
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    opacity: 0,
    zIndex: 2000,
    transform: "translateY(0)"
  },
  animate: { scale: 1, opacity: 1, transform: "translateY(0)" },
  exit: {
    scale: 2,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    opacity: 0,
    transform: "translateY(0)"
  },
  transition: { duration: 0.25, type: "tween", ease: "easeInOut" }
};
