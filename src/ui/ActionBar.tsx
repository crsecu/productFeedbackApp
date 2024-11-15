function ActionBar(): React.JSX.Element {
  return (
    <section>
      {/* TO DO: Consider refactoring this component into a layout component; use FeedbackCount instead of <h2>*/}
      <h2>
        <span>0</span> Suggestions
      </h2>
      <span>Sort by</span>
      <button>Add Feedback</button>
    </section>
  );
}

export default ActionBar;
