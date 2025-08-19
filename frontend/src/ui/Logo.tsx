import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  width: 250px;
  //margin-top: 80px;
`;

function Logo(): React.JSX.Element {
  return (
    <StyledLogo>
      <img src="assets/logoLight.svg" />
    </StyledLogo>
  );
}

export default Logo;
