import styled from "styled-components";
import { RoadmapLoaderData } from "../../types/loader.types";
import RoadmapStatusHeader from "./RoadmapStatusHeader";
import RoadmapStatusSection from "./RoadmapStatusSection";

const Section = styled.section`
  width: 33%;
`;

interface RoadmapStatusBoardProps {
  dataFromLoader: RoadmapLoaderData;
}

function renderRoadmapColumns(
  statusGroupedData: RoadmapLoaderData
): JSX.Element[] {
  return (Object.keys(statusGroupedData) as Array<keyof RoadmapLoaderData>).map(
    (status) => {
      const feedbackList = statusGroupedData[status];

      return (
        <Section key={`section-${status}`}>
          <RoadmapStatusSection feedbackList={feedbackList}>
            <RoadmapStatusHeader
              status={status}
              feedbackCount={feedbackList.length}
            />
          </RoadmapStatusSection>
        </Section>
      );
    }
  );
}

function RoadmapStatusBoard({
  dataFromLoader,
}: RoadmapStatusBoardProps): React.JSX.Element {
  //TO DO: Assess if memoizing renderRoadmapColumn is worth the cost given its low complexity

  const roadmapSections = renderRoadmapColumns(dataFromLoader);

  return <>{roadmapSections}</>;
}

export default RoadmapStatusBoard;
