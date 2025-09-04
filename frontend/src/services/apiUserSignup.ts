import { MutationResult } from "../types/mutation.types";
import { UserSB } from "../types/supabaseAuth.types";
import {
  LoginUserCredentials,
  UserIdentifierAvailability,
  NewUserProfile,
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
    console.log("SIGNUP form error", err);
    return { success: false, error: err };
  }
}

//check for email/username conflicts before signing up
export async function checkUserSignupConflicts(email: string) {
  try {
    const userIdentifierData = await fetchWrapper<UserIdentifierAvailability>(
      `${API_URL}/rpc/check_user_conflicts_email`,
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

    if (userIdentifierData.emailTaken) {
      const signupError = createActionResult("validationError", {
        actionType: "createUser",
        validationErrors: {
          email:
            "Looks like this email is already registered. Try signing in or use a different one.",
        },
      });

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
  profileData: NewUserProfile
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

    return { success: true, payload: userProfile };
  } catch (err) {
    return { success: false, error: err };
  }
}
