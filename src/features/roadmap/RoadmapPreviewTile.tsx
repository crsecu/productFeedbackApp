import RoadmapPreviewItem from "./RoadmapPreviewItem";
import { RoadmapStats, RoadmapStatus } from "../../types/roadmap.types";
import styled from "styled-components";

import { panelStyles, StyledLink } from "../../styles/UIStyles";
import { H2 } from "../../styles/Typography";
import device from "../../styles/breakpoints";

const StyledRoadmapPreviewTile = styled.section`
  ${panelStyles}
  padding: 22px;

  display: initial;

  & div,
  li {
    display: flex;
    justify-content: space-between;
  }

  & ul {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    margin-top: 20px;
  }

  @media ${device.lg} {
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
        <H2 id="roadmapPreview">Roadmap</H2>

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
