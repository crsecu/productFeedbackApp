import styled from "styled-components";

const StyledLogo = styled.div`
  height: 80px;
  text-align: center;
`;
function Logo(): React.JSX.Element {
  return (
    <StyledLogo>
      <p>Logo</p>
    </StyledLogo>
  );
}

export default Logo;
