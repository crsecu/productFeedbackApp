import styled from "styled-components";
import { H2 } from "../../styles/Typography";
import { RoadmapStatus } from "../../types/roadmap.types";
import { capitalizeFirstLetter } from "../../utils/helpers";

const StyledRoadmapStatusHeader = styled.div`
  & h2 {
    margin-bottom: 4px;
  }

  margin-bottom: 24px;
`;
interface RoadmapStatusHeader {
  status: RoadmapStatus;
  feedbackCount: number;
}

const statusDescription = {
  planned: "Ideas prioritized for research",
  "in-Progress": "Features currently being developed",
  live: "Released features",
};

function RoadmapStatusHeader({
  status,
  feedbackCount,
}: RoadmapStatusHeader): React.JSX.Element {
  const statusTitle = capitalizeFirstLetter(status);
  return (
    <StyledRoadmapStatusHeader>
      <H2>
        {statusTitle} <span>({feedbackCount})</span>
      </H2>
      <p>{statusDescription[status]}</p>
    </StyledRoadmapStatusHeader>
  );
}

export default RoadmapStatusHeader;
