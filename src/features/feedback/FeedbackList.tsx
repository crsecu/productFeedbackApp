import FeedbackCard from "./FeedbackCard";
import { Feedback } from "./feedback.types";

interface FeedbackListProps {
  data: Feedback[];
}

function FeedbackList({ data }: FeedbackListProps): React.JSX.Element {
  return (
    <section className="feedback_list">
      <h2>Feedback List</h2> {/* visually hidden heading */}
      <ul>
        {data.map((item) => {
          return <FeedbackCard key={item.id} feedback={item} />;
        })}
      </ul>
    </section>
  );
}

export default FeedbackList;
