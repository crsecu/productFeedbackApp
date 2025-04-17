interface ActionBarProps {
  children: React.ReactNode;
  ariaLabel?: string;
}
function ActionBar({ children, ariaLabel }: ActionBarProps): React.JSX.Element {
  const sectionProps = ariaLabel ? { "aria-label": ariaLabel } : {};
  return <section {...sectionProps}>{children}</section>;
}

export default ActionBar;
