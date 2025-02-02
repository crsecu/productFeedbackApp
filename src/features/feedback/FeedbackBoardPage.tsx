import { Link, Outlet, useLocation } from "react-router-dom";
import PageHeader from "../../ui/PageHeader";
import FilterByCategory from "./FilterByCategory";
import RoadmapPreviewTile from "../roadmap/RoadmapPreviewTile";
import FeedbackList from "./FeedbackList";
import ActionBar from "../../ui/ActionBar";
import FeedbackCount from "./FeedbackCount";
import SortBy from "./SortBy";
import TitleCard from "./TitleCard";

function FeedbackBoardPage(): React.JSX.Element {
  /* TO DO: create custom hook - this logic is also used inside roadmapDevelopment */
  const location = useLocation();
  const isCreateFeedback =
    location.pathname === "/feedbackBoard/createFeedback";
  console.log("createFeedback???", isCreateFeedback);

  return (
    <>
      {isCreateFeedback ? (
        <Outlet />
      ) : (
        <div className="feedbackBoard_layout">
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
              <Link to={"createFeedback"} state={{ from: location.pathname }}>
                Add Feedback
              </Link>
            </ActionBar>

            <FeedbackList />
          </main>
        </div>
      )}
    </>
  );
}

export default FeedbackBoardPage;
