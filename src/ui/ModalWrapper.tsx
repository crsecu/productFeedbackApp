import { ReactElement, cloneElement, useState } from "react";
import Modal from "./Modal";
import React from "react";

interface ModalWrapperProps {
  children: ReactElement<{ closeModal?: () => void }>;
}

function ModalWrapper({ children }: ModalWrapperProps): React.JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const clonedChildren = children
    ? cloneElement(children, { closeModal })
    : null;

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div>
      {!showModal && (
        <button onClick={() => setShowModal(true)} style={{ fontSize: "20px" }}>
          Show the modal
        </button>
      )}

      {showModal && <Modal closeModal={closeModal}>{clonedChildren}</Modal>}
    </div>
  );
}

export default ModalWrapper;
