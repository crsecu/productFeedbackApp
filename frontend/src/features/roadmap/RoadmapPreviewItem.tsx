import styled from "styled-components";
import { RoadmapStatusDot } from "../../styles/features/RoadmapStyles";

import { RoadmapStatus } from "../../types/roadmap.types";
import { capitalizeFirstLetter } from "../../utils/helpers";
const StyledRoadmapPreviewItem = styled.li``;

const Count = styled.span`
  font-size: var(--text-base);
  font-weight: var(--font-weight-bold);
`;

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
    <StyledRoadmapPreviewItem>
      <RoadmapStatusDot $status={stage}>{roadmapStatus}</RoadmapStatusDot>

      <Count>{count}</Count>
    </StyledRoadmapPreviewItem>
  );
}

export default RoadmapPreviewItem;
