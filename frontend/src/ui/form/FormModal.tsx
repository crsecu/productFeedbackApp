import { ReactNode } from "react";
import { CloseButton, Overlay } from "../../styles/UIStyles";
import { useKeyDown } from "../../utils/customHooks";
import { FocusTrap } from "focus-trap-react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { useAppSelector } from "../../types/redux.hooks";
import device from "../../styles/breakpoints";

const ModalContainer = styled.div<{ $dynamicHeight: boolean }>`
  position: fixed;
  inset: 0;
  width: fit-content;
  max-width: 90%;
  max-height: 88dvh;
  margin: auto;
  padding: 54px 0 30px;
  background-color: white;
  border-radius: var(--border-radius-sm);

  & .banner-notification {
    margin-bottom: 35px;
  }

  ${(props) =>
    props.$dynamicHeight &&
    `
   max-height: fit-content;
   padding: 0;

   & .formModal-inner{
    padding: 0;
   }

    & .banner-notification {
    margin-bottom: 0;
    }
   `}

  @media ${device.md} {
    max-width: 80%;
  }

  @media ${device.lg} {
    max-width: 65%;
  }

  @media ${device.xxl} {
    max-width: 45%;
  }
`;

const ModalInner = styled.div`
  max-height: 100%;
  overflow-y: auto;
  border-radius: var(--border-radius-sm);
  padding: 0 30px 0 30px;
`;

interface FormModalProps {
  children: ReactNode;
  hasDynamicHeight: boolean;
  onClose: () => void;
}

function FormModal({
  children,
  hasDynamicHeight,
  onClose,
}: FormModalProps): React.JSX.Element {
  const { isOpen: isGlobalModalOpen } = useAppSelector((state) => state.modal);

  useKeyDown("Escape", onClose, !isGlobalModalOpen);

  return (
    <Overlay onClick={onClose} className="no-scroll-modal">
      <ModalContainer
        $dynamicHeight={hasDynamicHeight}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className="ModalContainer"
      >
        <FocusTrap
          focusTrapOptions={{
            initialFocus: false,
            clickOutsideDeactivates: false,
            allowOutsideClick: true,
          }}
        >
          <ModalInner className="formModal-inner">
            {children}
            <CloseButton onClick={onClose}>
              <IoMdClose />
            </CloseButton>
          </ModalInner>
        </FocusTrap>
      </ModalContainer>
    </Overlay>
  );
}

export default FormModal;
