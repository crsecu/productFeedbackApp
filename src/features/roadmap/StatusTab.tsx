import styled from "styled-components";
import { RoadmapStatus } from "../../types/roadmap.types";
import { capitalizeFirstLetter } from "../../utils/helpers";

const StyledStatusTab = styled.button<{
  $activeTab: RoadmapStatus | null;
  $isDisabled: boolean;
}>`
  border: none;
  background: none;
  font-weight: var(--font-weight-bold);

  padding: 18px 8px;
  color: ${(props) =>
    props.$isDisabled ? "var(--color-text-disabled)" : "var(--color-tertiary)"};

  border-bottom: 4px solid
    ${(props) => `var(--color-status-${props.$activeTab})`};
  opacity: ${(props) => (props.$activeTab ? "initial" : "60%")};
  letter-spacing: -0.18px;
`;

interface StatusTabProps {
  children: number; //count of feedback items per status
  tabId: RoadmapStatus;
  activeTab: RoadmapStatus | null;
  handleClick: React.Dispatch<React.SetStateAction<RoadmapStatus | null>>;
  isDisabled: boolean;
}
function StatusTab({
  children,
  tabId,
  activeTab,
  handleClick,
  isDisabled,
}: StatusTabProps): React.JSX.Element {
  const tabName = capitalizeFirstLetter(tabId);

  return (
    <StyledStatusTab
      $isDisabled={isDisabled}
      type="button"
      role="tab"
      aria-selected={activeTab === tabId}
      aria-controls={`tabpanel-${tabId}`}
      id={tabId}
      onClick={() => handleClick(tabId)}
      $activeTab={tabId === activeTab ? activeTab : null}
      disabled={isDisabled}
    >
      {tabName} ({children})
    </StyledStatusTab>
  );
}

export default StatusTab;
