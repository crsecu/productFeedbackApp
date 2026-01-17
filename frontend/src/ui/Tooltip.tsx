import { ReactNode } from "react";
import styled from "styled-components";

const StyledToolTip = styled.div`
  position: relative;
  display: inline-block;

  & button {
    width: 100%;
  }

  &:hover span {
    visibility: visible;
  }

  &:focus span {
    visibility: visible;
  }

  & span {
    position: absolute;
    visibility: hidden;
    width: 130px;
    background-color: var(--color-surface);

    color: #3a4374;
    text-align: center;
    padding: 4px;
    border-radius: 6px;
    z-index: 1;
    bottom: 100%;
    left: 50%;
    margin-left: -60px;
    margin-bottom: 12px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
  & span::after {
    content: " ";
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }

  &:focus-visible {
    outline: none;

    & button {
      color: white;
      background-color: var(--color-text-disabled);
    }
  }
`;

interface TooltipProps {
  children: ReactNode;
  text: string;
}

function Tooltip({ children, text }: TooltipProps): React.JSX.Element {
  return (
    <StyledToolTip tabIndex={0}>
      {children}
      <span className="tooltiptext">{text}</span>
    </StyledToolTip>
  );
}

export default Tooltip;
