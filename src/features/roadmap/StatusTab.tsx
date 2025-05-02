import styled from "styled-components";
import { RoadmapStatus } from "../../types/roadmap.types";
import { capitalizeFirstLetter } from "../../utils/helpers";

const StyledStatusTab = styled.button<{
  $activeTab: RoadmapStatus | undefined;
}>`
  border: none;
  background: none;
  font-weight: var(--font-weight-bold);

  padding: 18px 8px;
  color: var(--color-tertiary);
  border-bottom: 4px solid
    ${(props) => `var(--color-status-${props.$activeTab})`};
  opacity: ${(props) => (props.$activeTab ? "initial" : "50%")};
  letter-spacing: -0.18px;

  /* &:nth-child(1) {
    padding: 18px 10px;
  }

  &:nth-child(2) {
    padding: 18px 16px;
  }

  &:nth-child(3) {
    padding: 18px 16px;
  } */
`;

interface StatusTabProps {
  children: number; //count of feedback items per status
  tabId: RoadmapStatus;
  activeTab: RoadmapStatus;
  handleClick: React.Dispatch<React.SetStateAction<RoadmapStatus>>;
}
function StatusTab({
  children,
  tabId,
  activeTab,
  handleClick,
}: StatusTabProps): React.JSX.Element {
  const tabName = capitalizeFirstLetter(tabId);

  return (
    <StyledStatusTab
      type="button"
      role="tab"
      aria-selected={activeTab === tabId}
      aria-controls={`tabpanel-${tabId}`}
      id={tabId}
      onClick={() => handleClick(tabId)}
      $activeTab={tabId === activeTab ? activeTab : undefined}
    >
      {tabName} ({children})
    </StyledStatusTab>
  );
}

export default StatusTab;
