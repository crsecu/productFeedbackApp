import styled from "styled-components";

const StyledLogo = styled.div`
  width: 120px;
  display: block;
`;

function Logo(): React.JSX.Element {
  return (
    <StyledLogo>
      <img src="/assets/logo.svg" />
    </StyledLogo>
  );
}

export default Logo;
