import styled from "styled-components";
import device from "../styles/breakpoints";

const StyledActionBar = styled.section<{ $isMinimal?: boolean }>`
  display: flex;
  align-items: center;

  background-color: ${(props) =>
    props.$isMinimal ? "initial" : "var(--color-action-bar)"};

  color: var(--color-text-light);
  padding: ${(props) => (props.$isMinimal ? "0 " : "10px 20px")};

  & a {
    margin-left: auto;
  }

  @media ${device.sm} {
    padding: ${(props) => (props.$isMinimal ? "0 " : "14px 12px 14px 16px")};
    border-radius: var(--border-radius-sm);
  }
`;

interface ActionBarProps {
  children: React.ReactNode;
  ariaLabel?: string;
  isMinimal?: boolean;
}
function ActionBar({
  children,
  ariaLabel,
  isMinimal,
}: ActionBarProps): React.JSX.Element {
  const sectionProps = ariaLabel ? { "aria-label": ariaLabel } : {};

  return (
    <StyledActionBar {...sectionProps} $isMinimal={isMinimal}>
      {children}
    </StyledActionBar>
  );
}

export default ActionBar;
