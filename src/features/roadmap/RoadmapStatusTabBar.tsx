import { useState } from "react";
import StatusTab from "./StatusTab";
import { RoadmapLoaderData } from "../../types/loader.types";
import RoadmapStatusHeader from "./RoadmapStatusHeader";

import { RoadmapStatus } from "../../types/roadmap.types";
import RoadmapStatusSection from "./RoadmapStatusSection";
import styled from "styled-components";
import device from "../../styles/breakpoints";

const TabButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 6vw;
  border-bottom: 1px solid var(--color-divider);

  @media ${device.sm} {
    padding: 0 10vw;
  }
`;

const TabPanel = styled.section`
  &[role="tabpanel"] {
    padding: 28px 7vw;
  }
  @media ${device.sm} {
    &[role="tabpanel"] {
      padding: 28px 12vw;
    }
  }
`;

interface RoadmapStatusTabBarProps {
  dataFromLoader: RoadmapLoaderData;
}

function RoadmapStatusTabBar({
  dataFromLoader,
}: RoadmapStatusTabBarProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<RoadmapStatus>("in-Progress");

  const tabButtons = (
    Object.keys(dataFromLoader) as Array<keyof RoadmapLoaderData>
  ).map((status) => {
    const feedbackCount = dataFromLoader[status].length;

    return (
      <StatusTab
        key={`key-${status}`}
        tabId={status}
        handleClick={setActiveTab}
        activeTab={activeTab}
      >
        {feedbackCount}
      </StatusTab>
    );
  });

  return (
    <div>
      <TabButtons role="tablist" aria-label="Sample Tabs" id="roadmap-tablist">
        {tabButtons}
      </TabButtons>

      <TabPanel role="tabpanel" id={`tabpanel-${activeTab}`}>
        <RoadmapStatusSection feedbackList={dataFromLoader[activeTab]}>
          <RoadmapStatusHeader
            status={activeTab}
            feedbackCount={dataFromLoader[activeTab].length}
          />
        </RoadmapStatusSection>
      </TabPanel>
    </div>
  );
}

export default RoadmapStatusTabBar;
