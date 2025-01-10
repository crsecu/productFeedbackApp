import React from "react";

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}
function Modal({ children }: ModalProps): React.JSX.Element {
  return (
    <div style={{ backgroundColor: "pink" }}>
      <h1>I am a cute modal</h1>

      {children}
    </div>
  );
}

export default Modal;
