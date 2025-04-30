import { useState } from "react";
import StatusTab from "./StatusTab";
import { RoadmapLoaderData } from "../../types/loader.types";
import RoadmapStatusHeader from "./RoadmapStatusHeader";

import { RoadmapStatus } from "../../types/roadmap.types";
import RoadmapStatusSection from "./RoadmapStatusSection";

interface RoadmapStatusTabBarProps {
  dataFromLoader: RoadmapLoaderData;
}

function RoadmapStatusTabBar({
  dataFromLoader,
}: RoadmapStatusTabBarProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<RoadmapStatus>("planned");

  const tabButtons = (
    Object.keys(dataFromLoader) as Array<keyof RoadmapLoaderData>
  ).map((status) => {
    return (
      <StatusTab
        key={`key-${status}`}
        tabId={status}
        handleClick={setActiveTab}
        activeTab={activeTab}
      />
    );
  });

  return (
    <>
      <div role="tablist" aria-label="Sample Tabs" id="roadmap-tablist">
        {tabButtons}
      </div>

      <section role="tabpanel" id={`tabpanel-${activeTab}`}>
        <RoadmapStatusSection feedbackList={dataFromLoader[activeTab]}>
          <RoadmapStatusHeader
            statusTitle={activeTab}
            feedbackCount={dataFromLoader[activeTab].length}
          />
        </RoadmapStatusSection>
      </section>
    </>
  );
}

export default RoadmapStatusTabBar;
