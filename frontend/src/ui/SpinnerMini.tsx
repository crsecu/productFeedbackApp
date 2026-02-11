import styled, { keyframes } from "styled-components";

import { CgSpinner } from "react-icons/cg";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(CgSpinner)`
  width: 2.4rem;
  height: 2.4rem;
  animation: ${rotate} 1.5s infinite linear;
  //color: var(--color-secondary);
`;

export default SpinnerMini;
