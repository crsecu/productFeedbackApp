import { useAppDispatch, useAppSelector } from "../../types/redux.hooks";
import { hideNotification } from "../../store/slices/toastNotificationSlice";
import { useEffect } from "react";
import styled from "styled-components";
import { toastTheme, ToastThemeType } from "./toastNotificationConfig";
import { IoMdClose } from "react-icons/io";
import device from "../../styles/breakpoints";

const StyledToastNotification = styled.div<{ $theme: ToastThemeType }>`
  position: fixed;
  top: 2px;
  left: 0;
  right: 0;
  margin: auto;

  z-index: 999;

  padding: 0 2%;
  animation: fadeToast 5s ease-in-out forwards;
  opacity: 0;
  pointer-events: none;

  & > div {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 12px;
    border-radius: 16px;
    background-color: ${(props) =>
      props.$theme && toastTheme[props.$theme].backgroundColor};
    color: black;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
    border-bottom: 1px solid #2320203b;
  }

  & > div > svg {
    color: ${(props) => props.$theme && toastTheme[props.$theme].textColor};
  }

  & button {
    border: none;
    background: none;
    margin-left: auto;
    font-size: 16px;
  }

  & button svg {
    color: #514545;
  }

  @media ${device.sm} {
    padding: 0 4%;
  }

  @media ${device.lg} {
    padding: 0;
    max-width: 50%;
  }
`;

function ToastNotification(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const { isVisible, key } = useAppSelector((state) => state.toastNotification);
  console.log("key", key);

  useEffect(() => {
    if (!isVisible) return;

    const timeoutId = setTimeout(() => {
      dispatch(hideNotification());
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [dispatch, isVisible]);

  if (!isVisible || !key) return null;
  const Icon = toastTheme[key.type].icon;

  return (
    <StyledToastNotification
      $theme={key.type}
      className={`toastNotification ${isVisible ? "show" : "hide"}`}
    >
      <div>
        <Icon size={"24px"} />
        <p>{key?.message}</p>
        <button onClick={() => dispatch(hideNotification())}>
          <IoMdClose />
        </button>
      </div>
    </StyledToastNotification>
  );
}

export default ToastNotification;
