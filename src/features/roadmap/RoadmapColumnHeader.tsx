import styled from "styled-components";
import { H2 } from "../../styles/Typography";
import { RoadmapStatus } from "../../types/roadmap.types";

const StyledRoadmapColumnHeader = styled.div``;
interface RoadmapColumnHeader {
  statusTitle: RoadmapStatus;
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
    <StyledRoadmapColumnHeader>
      <H2>
        {statusTitle} <span>({feedbackCount})</span>
      </H2>
      <p>{statusDescription[statusTitle]}</p>
    </StyledRoadmapColumnHeader>
  );
}

export default RoadmapColumnHeader;
