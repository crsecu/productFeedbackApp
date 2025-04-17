import { RoadmapLoaderData } from "../../types/loader.types";
import RoadmapColumnHeader from "./RoadmapColumnHeader";
import RoadmapStatusColumn from "./RoadmapStatusColumn";

interface RoadmapStatusBoardProps {
  dataFromLoader: RoadmapLoaderData;
}

// This func renders feedback items grouped into columns by status (planned, in-Progress, live)
function renderRoadmapColumns(
  statusGroupedData: RoadmapLoaderData
): JSX.Element[] {
  return (Object.keys(statusGroupedData) as Array<keyof RoadmapLoaderData>).map(
    (status, i) => {
      const feedbackList = statusGroupedData[status];

      return (
        <RoadmapStatusColumn key={`${status + i}`} feedbackList={feedbackList}>
          <RoadmapColumnHeader
            statusTitle={status}
            feedbackCount={feedbackList.length}
          />
        </RoadmapStatusColumn>
      );
    }
  );
}

function RoadmapStatusBoard({
  dataFromLoader,
}: RoadmapStatusBoardProps): React.JSX.Element {
  //TO DO: Assess if memoizing renderRoadmapColumn is worth the cost given its low complexity
  const roadmapColumns = renderRoadmapColumns(dataFromLoader);

  return (
    <main>
      <ul>{roadmapColumns}</ul>;
    </main>
  );
}

export default RoadmapStatusBoard;
