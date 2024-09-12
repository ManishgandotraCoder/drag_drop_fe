import React, { useEffect } from "react";
import "./styles.css";
import ModalContainer from "./index.container";
import { ModalContainerType } from "./types";

const Modal: React.FC<ModalContainerType> = ({ image, onClose }) => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return <ModalContainer image={image} onClose={onClose} />;
};

export default Modal;
