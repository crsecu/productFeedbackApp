import { useNavigate } from "react-router-dom";
import { logUserOut } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../types/redux.hooks";
import { clearCachedSession } from "../../services/apiAuth";

function Logout(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logout() {
    clearCachedSession();
    dispatch(logUserOut());
    navigate("/login", { replace: true });
  }
  return <button onClick={logout}>Log out</button>;
}

export default Logout;
