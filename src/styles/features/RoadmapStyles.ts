import styled from "styled-components";
import { RoadmapStatus } from "../../types/roadmap.types";

export const StatusIndicator = styled.span<{ $status: RoadmapStatus }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => `var(--color-status-${props.$status})`};
  margin-right: 14px;
`;

export const StatusIndicator1 = styled.p<{ $status: RoadmapStatus }>`
  margin-bottom: 14px;

  &:before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(props) => `var(--color-status-${props.$status})`};
    margin-right: 4px;
    vertical-align: baseline;
  }
`;
