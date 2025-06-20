import styled from "styled-components";
import { H2 } from "../../styles/Typography";
import { RoadmapStatus } from "../../types/roadmap.types";
import { capitalizeFirstLetter } from "../../utils/helpers";
import device from "../../styles/breakpoints";

const StyledRoadmapStatusHeader = styled.div<{ $feedbackCount: number }>`
  color: ${(props) => props.$feedbackCount < 1 && "var(--color-text-disabled)"};

  & h2 {
    margin-bottom: 4px;
  }

  margin-bottom: 2px;

  @media ${device.md} {
    min-height: 78px;
  }
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
    <StyledRoadmapStatusHeader $feedbackCount={feedbackCount}>
      <H2>
        {statusTitle} <span>({feedbackCount})</span>
      </H2>
      <p>{statusDescription[status]}</p>
    </StyledRoadmapStatusHeader>
  );
}

export default RoadmapStatusHeader;
