import styled from "styled-components";
import device from "../styles/breakpoints";

const StyledActionBar = styled.section`
  display: flex;
  align-items: center;

  background-color: var(--color-action-bar);
  color: var(--color-text-light);
  padding: 10px 24px;

  @media ${device.sm} {
    padding: 14px 12px 14px 16px;
    border-radius: var(--border-radius-sm);
  }
`;

interface ActionBarProps {
  children: React.ReactNode;
  ariaLabel?: string;
}
function ActionBar({ children, ariaLabel }: ActionBarProps): React.JSX.Element {
  const sectionProps = ariaLabel ? { "aria-label": ariaLabel } : {};
  return <StyledActionBar {...sectionProps}>{children}</StyledActionBar>;
}

export default ActionBar;
