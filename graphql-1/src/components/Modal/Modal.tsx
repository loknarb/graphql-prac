import React from "react";
import ReactDOM from "react-dom";

import Button from "../Button/Button";
import "./Modal.css";
type Props = {
  title: string;
  onCancelModal: () => void;
  onAcceptModal: () => void;
  acceptEnabled: boolean;
  isLoading: boolean;
};
const Modal: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Props
> = ({ children, title, onCancelModal, onAcceptModal, acceptEnabled, isLoading }) => {
  const modalDiv = document.getElementById("modal-root")!;
  return ReactDOM.createPortal(
    <div className="modal">
      <header className="modal__header">
        <h1>{title}</h1>
      </header>
      <div className="modal__content">{children}</div>
      <div className="modal__actions">
        <Button design="danger" mode="flat" onClick={onCancelModal}>
          Cancel
        </Button>
        <Button mode="raised" onClick={onAcceptModal} disabled={!acceptEnabled} loading={isLoading}>
          Accept
        </Button>
      </div>
    </div>,
    modalDiv
  );
};

export default Modal;
