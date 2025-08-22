import styled from "styled-components";

const StyledLogo = styled.div`
  display: flex;
  gap: 2px;
  width: 120px;
  align-items: center;
`;

function Logo(): React.JSX.Element {
  return (
    <StyledLogo>
      <img src="/assets/suggestly.svg" />
    </StyledLogo>
  );
}

export default Logo;
