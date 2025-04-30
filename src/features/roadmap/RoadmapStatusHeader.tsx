import styled from "styled-components";
import { H2 } from "../../styles/Typography";
import { RoadmapStatus } from "../../types/roadmap.types";

const StyledRoadmapStatusHeader = styled.div``;
interface RoadmapStatusHeader {
  statusTitle: RoadmapStatus;
  feedbackCount: number;
}

const statusDescription = {
  planned: "Ideas prioritized for research",
  "in-Progress": "Currently being developed",
  live: "Released features",
};

function RoadmapStatusHeader({
  statusTitle,
  feedbackCount,
}: RoadmapStatusHeader): React.JSX.Element {
  return (
    <StyledRoadmapStatusHeader>
      <H2>
        {statusTitle} <span>({feedbackCount})</span>
      </H2>
      <p>{statusDescription[statusTitle]}</p>
    </StyledRoadmapStatusHeader>
  );
}

export default RoadmapStatusHeader;
