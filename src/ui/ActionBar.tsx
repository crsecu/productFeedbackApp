import styled from "styled-components";

const StyledActionBar = styled.section`
  display: flex;
  align-items: center;

  background-color: var(--color-action-bar);
  color: var(--color-text-light);
  padding: 10px 24px;
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
