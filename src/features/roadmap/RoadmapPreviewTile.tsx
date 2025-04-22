import RoadmapPreviewItem from "./RoadmapPreviewItem";
import { RoadmapStats, RoadmapStatus } from "../../types/roadmap.types";
import styled from "styled-components";
import { Card } from "../../styles/features/FeedbackStyles";
import { StyledLink } from "../../styles/UIStyles";

const StyledRoadmapPreviewTile = styled(Card)`
  flex-direction: column;
  gap: 14px;

  & div,
  li {
    display: flex;
    justify-content: space-between;
  }

  & h2 {
    font-size: 1.125rem;
  }
`;
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
  //TO DO: Assess if memoizing renderRoadmapPreviewItems is worth the cost given its low complexity
  const roadmapPreviewItems = renderRoadmapPreviewItems(roadmapStats);

  return (
    <StyledRoadmapPreviewTile aria-labelledby="roadmapPreview">
      <div>
        <h2 id="roadmapPreview">Roadmap</h2>

        {/* <button
          onClick={() => navigate("/developmentRoadmap")}
          aria-label="View full roadmap page with planned, in-progress, and live feedback"
          disabled={!roadmapCount}
        >
          View
        </button> */}
        <StyledLink
          to="/developmentRoadmap"
          aria-label="View full roadmap page with planned, in-progress, and live feedback"
        >
          View
        </StyledLink>
      </div>
      <ul>{roadmapPreviewItems}</ul>
    </StyledRoadmapPreviewTile>
  );
}

export default RoadmapPreviewTile;
