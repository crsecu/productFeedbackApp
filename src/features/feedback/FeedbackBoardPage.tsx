import { Link, Outlet, useLocation } from "react-router-dom";
import PageHeader from "../../ui/PageHeader";
import FilterByCategory from "./FilterByCategory";
import RoadmapPreviewTile from "../roadmap/RoadmapPreviewTile";
import FeedbackList from "./FeedbackList";
import ActionBar from "../../ui/ActionBar";
import FeedbackCount from "./FeedbackCount";
import SortBy from "./SortBy";
import TitleCard from "./TitleCard";
import Suggestions from "./Suggestions";

function FeedbackBoardPage(): React.JSX.Element {
  /* TO DO: create custom hook - this logic is also used inside roadmapDevelopment */
  const { pathname } = useLocation();

  const isCreateFeedback = pathname === "/feedbackBoard/createFeedback";

  return (
    <>
      {isCreateFeedback ? (
        <Outlet />
      ) : (
        <Suggestions>
          <div className="feecbackBoard_leftSection">
            <PageHeader>
              <TitleCard />
            </PageHeader>
            <aside className="feedbackBoard_aside">
              <FilterByCategory />
              <RoadmapPreviewTile />
            </aside>
          </div>
          <main className="feedbackBoard_main">
            <ActionBar>
              <FeedbackCount />
              <SortBy />
              <Link to={"createFeedback"} state={{ from: pathname }}>
                Add Feedback
              </Link>
            </ActionBar>

            <FeedbackList />
          </main>
        </Suggestions>
      )}
    </>
  );
}

export default FeedbackBoardPage;
