import { useState } from "react";
import StatusTab from "./StatusTab";
import { RoadmapLoaderData } from "../../types/loader.types";
import RoadmapColumnHeader from "./RoadmapColumnHeader";

import { RoadmapStatus } from "../../types/roadmap.types";
import FeedbackStatusList from "./FeedbackStatusList";

interface RoadmapStatusTabBarProps {
  dataFromLoader: RoadmapLoaderData;
}

function RoadmapStatusTabBar({
  dataFromLoader,
}: RoadmapStatusTabBarProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<RoadmapStatus>("planned");

  console.log("activeTab", activeTab);
  return (
    <>
      <div role="tablist" aria-label="Sample Tabs">
        <StatusTab
          tabId="planned"
          handleClick={setActiveTab}
          activeTab={activeTab}
        />
        <StatusTab
          tabId="in-Progress"
          handleClick={setActiveTab}
          activeTab={activeTab}
        />
        <StatusTab
          tabId="live"
          handleClick={setActiveTab}
          activeTab={activeTab}
        />
      </div>
      <section role="tabpanel" id={`tabpanel-${activeTab}`}>
        <FeedbackStatusList feedbackList={dataFromLoader[activeTab]}>
          <RoadmapColumnHeader
            statusTitle={activeTab}
            feedbackCount={dataFromLoader[activeTab].length}
          />
        </FeedbackStatusList>
      </section>
    </>
  );
}

export default RoadmapStatusTabBar;
