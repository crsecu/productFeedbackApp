import { RoadmapLoaderData } from "../../types/loader.types";
import RoadmapStatusHeader from "./RoadmapStatusHeader";
import RoadmapStatusSection from "./RoadmapStatusSection";

interface RoadmapStatusBoardProps {
  dataFromLoader: RoadmapLoaderData;
}

function renderRoadmapColumns(
  statusGroupedData: RoadmapLoaderData
): JSX.Element[] {
  return (Object.keys(statusGroupedData) as Array<keyof RoadmapLoaderData>).map(
    (status) => {
      const feedbackList = statusGroupedData[status];
      console.log("list by status", feedbackList);

      return (
        <section key={`section-${status}`}>
          <RoadmapStatusSection feedbackList={feedbackList}>
            <RoadmapStatusHeader
              statusTitle={status}
              feedbackCount={feedbackList.length}
            />
          </RoadmapStatusSection>
        </section>
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
