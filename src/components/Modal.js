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
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  }, [showModal]);

  return (
    <>
      {/* {showModal && <Overlay showModal={showModal} />} */}
      <Trigger updateModal={updateModal}>{trigger}</Trigger>

      <Modal showModal={showModal}>
        {content}
        <CloseButton closeModal={updateModal}></CloseButton>
      </Modal>
    </>
  );
};

const Modal = ({ children, onClose, showModal }) => {
  return createPortal(
    <AnimatePresence>
      {showModal && (
        <motion.div
          {...modalAnimateOptions}
          className="modal-container position-fixed overflow-auto"
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
      height: "3rem",

      borderRadius: "0 0 0 25px"
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

const Overlay = ({ showModal }) => {
  return createPortal(
    <AnimatePresence>
      {showModal && (
        <motion.div {...overlayAnimateOptions} className="position-fixed">
          <div className="body-overlay"></div>
        </motion.div>
      )}
    </AnimatePresence>,
    overlayRoot
  );
};

const overlayAnimateOptions = {
  initial: {
    top: 0,
    left: 0,
    minWidth: "100vw",
    minHeight: "100vh",
    opacity: 0,
    zIndex: 2000
  },
  animate: { opacity: 1 },
  exit: {
    opacity: 0
  },
  transition: { duration: 0.25, type: "tween", ease: "easeInOut" }
};

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
