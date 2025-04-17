import { useNavigate } from "react-router-dom";

import RoadmapPreviewItem from "./RoadmapPreviewItem";
import { RoadmapStats, RoadmapStatus } from "../../types/roadmap.types";

interface RoadmapPreviewProps {
  roadmapStats: RoadmapStats;
  roadmapCount: number;
}

// This func renders a list of RoadmapPreviewItem components from roadmap stats
function renderRoadmapPreviewItems(stats: RoadmapStats): JSX.Element[] {
  return Object.keys(stats).map((status) => {
    const count = stats[status as RoadmapStatus];

    return (
      <RoadmapPreviewItem
        key={status}
        stage={status as RoadmapStatus}
        count={count}
      />
    );
  });
}

function RoadmapPreviewTile({
  roadmapStats,
  roadmapCount,
}: RoadmapPreviewProps): React.JSX.Element {
  const navigate = useNavigate();

  //TO DO: Assess if memoizing renderRoadmapPreviewItems is worth the cost given its low complexity
  const roadmapPreviewItems = renderRoadmapPreviewItems(roadmapStats);

  return (
    <section aria-labelledby="roadmapPreview">
      <div>
        <h2 id="roadmapPreview" className="sr-only">
          Roadmap Summary
        </h2>

        <button
          onClick={() => navigate("/developmentRoadmap")}
          aria-label="View full roadmap page with planned, in-progress, and live feedback"
          disabled={!roadmapCount}
        >
          View
        </button>
      </div>
      <ul>{roadmapPreviewItems}</ul>
    </section>
  );
}

export default RoadmapPreviewTile;
