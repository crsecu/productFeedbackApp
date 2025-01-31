import { Link, useLoaderData } from "react-router-dom";

function RoadmapPreviewTile(): React.JSX.Element {
  const loaderData = useLoaderData();
  const { planned, "in-Progress": inProgress, live } = loaderData;
  return (
    <section>
      <div style={{ display: "flex" }}>
        <h2>Roadmap</h2> {/*TO DO: add a clearer title for ADA */}
        <Link to="/developmentRoadmap" aria-label="View full roadmap">
          View
        </Link>
      </div>

      <div>
        <span>Planned</span>
        <span style={{ fontWeight: "bold" }}> {planned.length}</span>
      </div>
      <div>
        <span>in-Progress</span>
        <span style={{ fontWeight: "bold" }}> {inProgress.length}</span>
      </div>
      <div>
        <span>Live</span>
        <span style={{ fontWeight: "bold" }}> {live.length}</span>
      </div>
    </section>
  );
}

export default RoadmapPreviewTile;
