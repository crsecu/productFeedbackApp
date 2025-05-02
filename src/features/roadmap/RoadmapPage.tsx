import { Outlet, useRouteLoaderData } from "react-router-dom";
import RoadmapStatusBoard from "./RoadmapStatusBoard";
import ActionBar from "../../ui/ActionBar";
import { RoadmapLoaderData } from "../../types/loader.types";
import styled from "styled-components";
import {
  GoBackLinkButton,
  PageStyles,
  PrimaryLinkButton,
} from "../../styles/UIStyles";
import { H1 } from "../../styles/Typography";
import RoadmapStatusTabBar from "./RoadmapStatusTabBar";

import { useIsMobile } from "../../utils/customHooks";
import device from "../../styles/breakpoints";

const StyledRoadmapPage = styled.div`
  ${PageStyles}
  padding: 0;

  & > section:first-child {
    justify-content: space-between;
    padding: 24px 20px;
  }

  & section div > h1 {
    margin-top: 6px;
  }

  & main {
    display: flex;
    flex-direction: column;
  }

  & main section {
    padding: 28px 24px 46px;
  }

  & main section ul {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  @media ${device.md} {
    & main {
      flex-direction: row;
    }
  }
`;

function RoadmapPage(): React.JSX.Element {
  const dataFromLoader = useRouteLoaderData("roadmapData") as RoadmapLoaderData;

  const isMobile = useIsMobile();

  return (
    <StyledRoadmapPage>
      <Outlet />
      <ActionBar>
        <div>
          <GoBackLinkButton to="/feedbackBoard">Go Back</GoBackLinkButton>
          <H1>Roadmap</H1>
        </div>

        <PrimaryLinkButton
          to={"createFeedback"}
          state={{ from: location.pathname }}
        >
          + Add Feedback
        </PrimaryLinkButton>
      </ActionBar>
      <main>
        {isMobile ? (
          <RoadmapStatusTabBar dataFromLoader={dataFromLoader} />
        ) : (
          <RoadmapStatusBoard dataFromLoader={dataFromLoader} />
        )}
      </main>
    </StyledRoadmapPage>
  );
}

export default RoadmapPage;
