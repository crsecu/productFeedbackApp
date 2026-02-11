import { useLoaderData, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../types/redux.hooks";
import { useEffect } from "react";
import {
  getLoggedInUser,
  setUserCredentials,
} from "../../store/slices/userSlice";
import { getUserProfileInfo } from "../../services/apiAuth";

function AuthGuard(): null {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const accessToken = useLoaderData() as string;

  const userProfileRedux = useAppSelector(getLoggedInUser);

  useEffect(() => {
    if (userProfileRedux.isUserLoggedIn) return;

    async function handleUserProfile() {
      const userProfile = await getUserProfileInfo(accessToken);
      if (!userProfile) return navigate("/login/welcome", { replace: true });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...userData } = userProfile;

      //to do: check if referencing entire userProfile object creates unnecessary reruns of useEffect; might need to use individual properties
      dispatch(setUserCredentials(userData));
      navigate("/app/feedbackBoard", { replace: true });
      return;
    }

    handleUserProfile();
  }, [accessToken, dispatch, navigate, userProfileRedux.isUserLoggedIn]);

  return null;
}

export default AuthGuard;
