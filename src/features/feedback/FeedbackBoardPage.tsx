import {
  Link,
  Outlet,
  useLocation,
  useNavigationType,
  useSearchParams,
} from "react-router-dom";
import PageHeader from "../../ui/PageHeader";
import FilterByCategory from "./FilterByCategory";
import RoadmapPreviewTile from "../roadmap/RoadmapPreviewTile";
import FeedbackList from "./FeedbackList";
import ActionBar from "../../ui/ActionBar";
import SuggestionCount from "./SuggestionCount";
import SortBy from "./SortBy";
import TitleCard from "./TitleCard";
import Suggestions from "./Suggestions";
import NewFeedback from "./NewFeedback";
import { useShowCreateFeedbackForm } from "../../utils/customHooks";
import { FeedbackBoardLoaderData } from "../../types/feedback.types";

interface FeedbackBoardProps {
  dataFromLoader: FeedbackBoardLoaderData;
}

function FeedbackBoardPage({
  dataFromLoader,
}: FeedbackBoardProps): React.JSX.Element {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigationType = useNavigationType();

  const newFeedbackId = searchParams.get("newFeedbackId");
  const showFeaturedFeedback =
    navigationType === "REPLACE" || navigationType === "PUSH";

  const isCreateFeedback = useShowCreateFeedbackForm();

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
              <SuggestionCount suggestions={dataFromLoader.suggestions} />
              <SortBy />
              <Link to={"createFeedback"} state={{ from: pathname }}>
                Add Feedback
              </Link>
            </ActionBar>
            {newFeedbackId && showFeaturedFeedback && (
              <NewFeedback newFeedbackId={newFeedbackId} />
            )}

            <FeedbackList suggestions={dataFromLoader.suggestions} />
          </main>
        </Suggestions>
      )}
    </>
  );
}

export default FeedbackBoardPage;
