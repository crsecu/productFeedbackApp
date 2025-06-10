import styled from "styled-components";
import { focusStyle, labelBox, panelStyles } from "../UIStyles";
import device from "../breakpoints";
import UpvoteButton from "../../features/feedback/UpvoteButton";

export const Card = styled.article`
  ${panelStyles}

  position: relative;
  padding: 0;

  & p {
    text-wrap: wrap;
  }

  & a,
  > div {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 22px;
    border-radius: inherit;
  }

  & button {
    left: 22px;
  }

  & a:focus-visible {
    ${focusStyle}
    outline: none !important;
  }
`;

export const CategoryLabel = styled.label`
  ${labelBox}
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-body-3);
  width: fit-content;
`;

export const UpvoteButtonDynamic = styled(UpvoteButton)`
  @media ${device.sm} {
    height: fit-content;
    top: 14%;

    & svg {
      display: block;
      margin: auto;
      margin-bottom: 6px;
      height: 14px;
      width: 14px;
    }
  }

  @media ${device.md} {
    padding: 12px 10px 8px;
  }
`;

/* SAVE BACKUP */
export const StyledFeedbackCard1 = styled.article`
  ${panelStyles}

  position: relative;
  padding-bottom: 26px;

  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;

  & p {
    text-wrap: wrap;
  }

  & a {
    display: flex;
    justify-content: space-between;
  }
`;
export { panelStyles };
