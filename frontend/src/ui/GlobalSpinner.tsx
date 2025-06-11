import styled from "styled-components";

const StyledGlobalSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh; // takes full viewport height

  & div {
    border: 10px solid #f3f3f3;
    border-top: 10px solid var(--color-primary);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 1s linear infinite;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

function GlobalSpinner(): React.JSX.Element {
  return (
    <StyledGlobalSpinner>
      <div></div>
    </StyledGlobalSpinner>
  );
}

export default GlobalSpinner;
