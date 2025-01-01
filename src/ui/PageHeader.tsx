interface PageHeaderProps {
  children: React.ReactNode;
}
function PageHeader({ children }: PageHeaderProps): React.JSX.Element {
  return <header>{children}</header>;
}

export default PageHeader;
