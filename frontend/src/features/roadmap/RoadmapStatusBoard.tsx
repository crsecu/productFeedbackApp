import styled from "styled-components";
import { RoadmapLoaderData } from "../../types/loader.types";
import RoadmapStatusHeader from "./RoadmapStatusHeader";
import RoadmapStatusSection, {
  RoadmapFeedbackCard,
} from "./RoadmapStatusSection";

const Section = styled.section`
  width: 33%;
`;

const EmptyRoadmapCard = styled(RoadmapFeedbackCard)`
  background: none;
  border-color: var(--color-text-disabled);
  outline: var(--color-border-disabled);
  color: var(--color-text-disabled);
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;

  & p {
    text-align: center;
    padding-top: 2px;
  }

  & span {
    text-transform: lowercase;
  }
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
          <RoadmapStatusHeader
            status={status}
            feedbackCount={feedbackList.length}
          />
          {feedbackList.length >= 1 ? (
            <RoadmapStatusSection feedbackList={feedbackList} />
          ) : (
            <EmptyRoadmapCard $status={status}>
              <p>
                No items <span>{status}</span> yet
              </p>
            </EmptyRoadmapCard>
          )}
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
