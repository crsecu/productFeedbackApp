import { RoadmapStatusType } from "../../types/feedback.types";

interface RoadmapPreviewItemProps {
  stage: RoadmapStatusType;
  count: number;
}
function RoadmapPreviewItem({
  stage,
  count,
}: RoadmapPreviewItemProps): React.JSX.Element {
  return (
    <li>
      <span>{stage}</span>
      <span style={{ fontWeight: "bold" }}> {count}</span>
    </li>
  );
}

export default RoadmapPreviewItem;
