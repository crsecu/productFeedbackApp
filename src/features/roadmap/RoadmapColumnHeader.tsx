import { RoadmapStatusType } from "../../types/feedback.types";

interface RoadmapColumnHeader {
  statusTitle: RoadmapStatusType;
  feedbackCount: number;
}

const statusDescription = {
  planned: "Ideas prioritized for research",
  "in-Progress": "Currently being developed",
  live: "Released features",
};

function RoadmapColumnHeader({
  statusTitle,
  feedbackCount,
}: RoadmapColumnHeader): React.JSX.Element {
  return (
    <div>
      <h2>
        {statusTitle} <span>({feedbackCount})</span>
      </h2>
      <p>{statusDescription[statusTitle]}</p>
    </div>
  );
}

export default RoadmapColumnHeader;
