import { formatCategoryLabel } from "../../utils/helpers";
import detectiveImage from "../../assets/images/no-feedback-image.svg";
import styled from "styled-components";
import { PrimaryLinkButton } from "../../styles/UIStyles";
import device from "../../styles/breakpoints";

const StyledEmptyFeedbackState = styled.div`
  background-color: var(--color-surface);
  border-radius: var(--border-radius);
  flex-grow: 1;

  & div {
    width: 84%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    gap: 10px;
  }

  & img {
    width: 102px;
    height: 108px;

    margin: 70px auto 36px;
  }

  & p:last-of-type {
    color: var(--color-text-muted);
    text-align: center;
    margin-bottom: 16px;
    max-width: 348px;

    @media ${device.sm} {
      max-width: 430px;
    }
  }
`;

const NoFeedbackText = styled.p`
  font-size: var(--text-lg);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.25px;
  text-align: center;

  @media ${device.sm} {
    font-size: var(--text-xxl);
    letter-spacing: -0.33px;
  }
`;

interface EmptyFeedbackStateProps {
  category: string;
}

function EmptyFeedbackState({
  category,
}: EmptyFeedbackStateProps): React.JSX.Element {
  const formatCategory = formatCategoryLabel(category);

  const noFeedbackText =
    category === "all" ? (
      "There is no feedback yet."
    ) : (
      <>
        No feedback found in the
        <span> {formatCategory}</span> category.
      </>
    );
  return (
    <StyledEmptyFeedbackState>
      <img src={detectiveImage} alt="No feedback" />

      <div>
        <NoFeedbackText>{noFeedbackText}</NoFeedbackText>
        <p>
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
        <PrimaryLinkButton
          to="createFeedback"
          state={{ from: location?.pathname }}
        >
          + Add Feedback
        </PrimaryLinkButton>
      </div>
    </StyledEmptyFeedbackState>
  );
}

export default EmptyFeedbackState;
