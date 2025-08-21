import styled from "styled-components";

const StyledLogo = styled.div`
  width: 60px;
`;

function Logo(): React.JSX.Element {
  return (
    <StyledLogo>
      <img src="assets/suggestlyLogo.svg" />
    </StyledLogo>
  );
}

export default Logo;
