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

import { useMatchMedia } from "../../utils/customHooks";
import device from "../../styles/breakpoints";

const StyledRoadmapPage = styled.div`
  ${PageStyles}
  padding: 0;

  & > section:first-child {
    padding: 24px 20px;
  }

  & > section div > h1 {
    margin-top: 6px;
  }

  & main {
    display: flex;
    flex-direction: column;
  }

  & main section {
    padding: 28px 24px 46px;
    flex: 1;
  }

  & main section ul {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  @media ${device.md} {
    & main {
      padding: 0 8px;
      flex-direction: row;
      gap: 10px;
    }

    & main section {
      padding: 28px 0 46px;
    }
  }

  @media ${device.lg} {
    & main {
      gap: 16px;
    }
  }
`;

function RoadmapPage(): React.JSX.Element {
  const dataFromLoader = useRouteLoaderData("roadmapData") as RoadmapLoaderData;
  const isMobile = useMatchMedia("(max-width: 767px");

  return (
    <StyledRoadmapPage>
      <Outlet />
      <ActionBar>
        <div>
          <GoBackLinkButton to="/">Go Back</GoBackLinkButton>
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
