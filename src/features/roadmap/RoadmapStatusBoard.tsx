import { RoadmapLoaderData } from "../../types/loader.types";
import RoadmapColumnHeader from "./RoadmapColumnHeader";
import FeedbackStatusList from "./FeedbackStatusList";

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
        <section>
          <FeedbackStatusList feedbackList={feedbackList}>
            <RoadmapColumnHeader
              statusTitle={status}
              feedbackCount={feedbackList.length}
            />
          </FeedbackStatusList>
        </section>
      );
    }
  );
}

function RoadmapStatusBoard({
  dataFromLoader,
}: RoadmapStatusBoardProps): React.JSX.Element {
  //TO DO: Assess if memoizing renderRoadmapColumn is worth the cost given its low complexity
  console.log("ddd", dataFromLoader);
  const roadmapSections = renderRoadmapColumns(dataFromLoader);

  return <>{roadmapSections}</>;
}

export default RoadmapStatusBoard;
