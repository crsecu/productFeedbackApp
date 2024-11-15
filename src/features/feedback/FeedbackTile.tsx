function FeedbackTile(): React.JSX.Element {
  return (
    <article className="feedback_tile">
      {/* TO DO: display title as an <h1> if feedback tile is rendered on Feedback Detail Page */}
      {/*detailPage ? <h1>Title</h1> : <h3>Title</h3> */}
      <h3>Add a dark theme option</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
        similique adipisci perferendis est exercitationem, distinctio
        perspiciatis sapiente dicta sit alias dolor repellendus cumque! Debitis,
        sequi necessitatibus vel eaque neque officiis.
      </p>
      <p>Enhancement</p>
      <span>Up Vote</span>
      <span>Comment Count 2</span>
    </article>
  );
}

export default FeedbackTile;
