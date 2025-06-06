import { ReactNode } from "react";
import { CloseButton, Overlay } from "../../styles/UIStyles";
import { useKeyDown } from "../../utils/customHooks";
import { FocusTrap } from "focus-trap-react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { useAppSelector } from "../../types/redux.hooks";

const ModalContainer = styled.div`
  position: relative;
  max-width: 90%;
  max-height: calc(100dvh - 56px);
  margin: auto;
  top: 28px;
  padding-top: 36px;
  background-color: white;
  border-radius: var(--border-radius-sm);
`;

const ModalInner = styled.div`
  max-height: inherit;
  overflow-y: auto;
  border-radius: var(--border-radius-sm);
`;

interface FormModalProps {
  children: ReactNode;
  onClose: () => void;
}

function FormModal({ children, onClose }: FormModalProps): React.JSX.Element {
  const { isOpen: isGlobalModalOpen } = useAppSelector((state) => state.modal);

  useKeyDown("Escape", onClose, !isGlobalModalOpen);

  return (
    <Overlay onClick={onClose} className="no-scroll-modal">
      <ModalContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <FocusTrap
          focusTrapOptions={{
            initialFocus: false,
            clickOutsideDeactivates: false,
            allowOutsideClick: true,
          }}
        >
          <ModalInner>
            <>
              <CloseButton onClick={onClose}>
                <IoMdClose />
              </CloseButton>
              {children}
            </>
          </ModalInner>
        </FocusTrap>
      </ModalContainer>
    </Overlay>
  );
}

export default FormModal;
