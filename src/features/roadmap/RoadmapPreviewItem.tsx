import styled from "styled-components";
import { StatusIndicator } from "../../styles/features/RoadmapStyles";

import { RoadmapStatus } from "../../types/roadmap.types";
import { capitalizeFirstLetter } from "../../utils/helpers";

const Status = styled.span`
  font-size: var(--text-base);
`;

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
    <li>
      <Status>
        <StatusIndicator $status={stage} />
        {roadmapStatus}
      </Status>
      <Count>{count}</Count>
    </li>
  );
}

export default RoadmapPreviewItem;
