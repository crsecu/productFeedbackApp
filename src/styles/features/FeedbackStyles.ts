import styled from "styled-components";
import { labelBox, panelStyles } from "../UIStyles";
import device from "../breakpoints";
import UpvoteButton from "../../features/feedback/UpvoteButton";

export const Card = styled.article`
  ${panelStyles}

  position: relative;
  padding-bottom: 26px;

  & p {
    text-wrap: wrap;
  }

  & a,
  > div {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
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
    position: initial;
    height: fit-content;
    padding: 10px 8px 8px;

    & svg {
      display: block;
      margin: auto;
      margin-bottom: 5px;
      height: 14px;
      width: 14px;
    }
  }

  @media ${device.md} {
    padding: 12px 10px 8px;

    & svg {
      margin-bottom: 5px;
      height: 14px;
      width: 14px;
    }
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
