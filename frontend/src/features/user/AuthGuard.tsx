import { useLoaderData, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../types/redux.hooks";
import { useEffect } from "react";
import { AuthGuardLoaderData } from "../../types/loader.types";
import {
  getLoggedInUser,
  setUserCredentials,
} from "../../store/slices/userSlice";
import { getUserProfileInfo } from "../../services/apiAuth";

function AuthGuard(): null {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loaderData = useLoaderData() as AuthGuardLoaderData;
  const { accessToken } = loaderData || {};

  const userProfileRedux = useAppSelector(getLoggedInUser);
  console.log("userProfileRedux render logic", userProfileRedux);

  //effect
  useEffect(() => {
    if (userProfileRedux.isUserLoggedIn) return;

    async function handleUserProfile() {
      const userProfile = await getUserProfileInfo(accessToken);
      if (!userProfile) return navigate("/login/welcome", { replace: true });

      const { name, username, image } = userProfile;

      //to do: check if referencing entire userProfile object creates unnecessary reruns of useEffect; might need to use individual properties
      dispatch(setUserCredentials({ name, image, username }));
      navigate("/app/feedbackBoard", { replace: true });
      return;
    }

    handleUserProfile();
  }, [accessToken, dispatch, navigate, userProfileRedux.isUserLoggedIn]);

  return null;
}

export default AuthGuard;
