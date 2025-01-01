interface ActionBarProps {
  children: React.ReactNode;
}
function ActionBar({ children }: ActionBarProps): React.JSX.Element {
  return <section className="actionBar">{children}</section>;
}

export default ActionBar;
