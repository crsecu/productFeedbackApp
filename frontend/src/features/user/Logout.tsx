import { useNavigate } from "react-router-dom";
import { logUserOut } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../types/redux.hooks";
import { clearCachedSession } from "../../services/apiAuth";
import styled from "styled-components";

import { GoSignOut } from "react-icons/go";

const StyledLogoutButton = styled.button`
  background: none;
  border: none;
  padding: 0 7px;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-danger-hover);

    svg {
      color: var(--color-text-dark);
    }
  }

  &:focus-visible {
    outline-offset: 0;
  }

  & svg {
    width: 1.4rem;
    height: 1.4rem;

    color: var(--color-danger);
  }
`;

function Logout(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logout() {
    clearCachedSession();
    dispatch(logUserOut());
    navigate("/login", { replace: true });
  }

  return (
    <StyledLogoutButton onClick={logout}>
      <GoSignOut />
    </StyledLogoutButton>
  );
}

export default Logout;
