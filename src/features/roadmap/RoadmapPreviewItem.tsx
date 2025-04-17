import { RoadmapStatus } from "../../types/roadmap.types";

interface RoadmapPreviewItemProps {
  stage: RoadmapStatus;
  count: number;
}
function RoadmapPreviewItem({
  stage,
  count,
}: RoadmapPreviewItemProps): React.JSX.Element {
  return (
    <li>
      <span>{stage}</span>
      <span> {count}</span>
    </li>
  );
}

export default RoadmapPreviewItem;
