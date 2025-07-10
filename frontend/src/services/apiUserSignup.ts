import { MutationResult } from "../types/mutation.types";
import { UserSB } from "../types/supabaseAuth.types";
import {
  LoginUserCredentials,
  UserIdentifierAvailability,
  UserProfileInput,
  UserProfile,
} from "../types/user.types";
import { fetchWrapper, createActionResult } from "../utils/helpers";
import { fetchWrapperSBAuth, AUTH_API_URL } from "./apiAuth";
import { API_URL, API_KEY, HEADERS } from "./apiFeedback";

//create new user API call
export async function signupUser(
  accessToken: string,
  userCredentials: LoginUserCredentials
): Promise<MutationResult<UserSB>> {
  const JSONRequestBody = JSON.stringify({
    ...userCredentials,
    options: {
      emailRedirectTo: "http://localhost:5173/welcome",
    },
  });

  try {
    const data = await fetchWrapperSBAuth<UserSB>(
      AUTH_API_URL,
      "/signup",
      "POST",
      {
        apikey: accessToken,
        accept: "application/json",
        "Content-Type": "application/json",
      },
      JSONRequestBody
    );

    return { success: true, payload: data };
  } catch (err) {
    return { success: false, error: err };
  }
}

//check for email/username conflicts before signing up
export async function checkUserSignupConflicts(email: string) {
  try {
    const userIdentifierData = await fetchWrapper<UserIdentifierAvailability>(
      `${API_URL}/rpc/check_user_conflicts`,
      {
        method: "POST",
        headers: {
          apikey: API_KEY,
          "Content-Type": "application/json",
          Accept: "application/vnd.pgrst.object+json",
        },
        body: JSON.stringify({ emailInput: email }),
      }
    );

    console.log("RPC returned data", userIdentifierData);
    const { emailTaken } = userIdentifierData || {};

    //return userIdentifierData;
    if (userIdentifierData.emailTaken) {
      const signupError = createActionResult("failure", {
        actionType: "createUser",
        submitError: {
          email: emailTaken ? "Email taken." : null,
        },
      });

      console.log("signup error ", signupError);
      return signupError;
    }

    return false;
  } catch (err) {
    console.log("checking user identifier availability ERROR", err);
  }
}

//create new user profile
export async function createUserProfile(
  accessToken: string,
  profileData: UserProfileInput
): Promise<MutationResult<UserProfile>> {
  const jsonProfileData = JSON.stringify(profileData);

  try {
    const userProfile = await fetchWrapper<UserProfile>(
      `${API_URL}/userProfiles`,
      {
        method: "POST",

        headers: {
          ...HEADERS.writeObject,
          Authorization: `Bearer ${accessToken}`,
        },
        body: jsonProfileData,
      }
    );
    console.log("user profile here", userProfile);
    return { success: true, payload: userProfile };
  } catch (err) {
    console.log("ooopsy", err);
    return { success: false, error: err };
  }
}
