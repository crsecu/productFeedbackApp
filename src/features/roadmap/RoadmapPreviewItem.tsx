import { StatusIndicator } from "../../styles/features/RoadmapStyles";
import { StrongText } from "../../styles/UIStyles";
import { RoadmapStatus } from "../../types/roadmap.types";
import { capitalizeFirstLetter } from "../../utils/helpers";

interface RoadmapPreviewItemProps {
  stage: RoadmapStatus;
  count: number;
}
function RoadmapPreviewItem({
  stage,
  count,
}: RoadmapPreviewItemProps): React.JSX.Element {
  const roadmapStatus = capitalizeFirstLetter(stage);
  return (
    <li>
      <span>
        <StatusIndicator $status={stage} />
        {roadmapStatus}
      </span>
      <StrongText>{count}</StrongText>
    </li>
  );
}

export default RoadmapPreviewItem;
