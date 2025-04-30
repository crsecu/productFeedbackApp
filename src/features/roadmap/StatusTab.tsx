import { RoadmapStatus } from "../../types/roadmap.types";
import { capitalizeFirstLetter } from "../../utils/helpers";

interface StatusTabProps {
  tabId: RoadmapStatus;
  activeTab: RoadmapStatus;
  handleClick: React.Dispatch<React.SetStateAction<RoadmapStatus>>;
}
function StatusTab({
  tabId,
  activeTab,
  handleClick,
}: StatusTabProps): React.JSX.Element {
  const tabName = capitalizeFirstLetter(tabId);

  return (
    <button
      type="button"
      role="tab"
      aria-selected={activeTab === tabId}
      aria-controls={`tabpanel-${tabId}`}
      id={tabId}
      onClick={() => handleClick(tabId)}
    >
      {tabName}
    </button>
  );
}

export default StatusTab;
