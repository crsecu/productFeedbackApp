import { ActionFunctionArgs } from "react-router-dom";
import { AUTH_API_URL, fetchWrapperSBAuth } from "../services/apiAuth";
import { API_KEY, API_URL, HEADERS } from "../services/apiFeedback";
import {
  createActionResult,
  fetchWrapper,
  handleValidationErrors,
  performActionSubmission,
} from "../utils/helpers";
import { CreateUserFormValues } from "../types/form.types";
import { UserSB } from "../types/supabaseAuth.types";
import { MutationResult } from "../types/mutation.types";
import {
  LoginUserCredentials,
  UserIdentifierAvailability,
  UserProfile,
  UserProfileInput,
} from "../types/user.types";

//create new user API call
async function signupUser(
  accessToken: string,
  userCredentials: LoginUserCredentials
): Promise<MutationResult<UserSB>> {
  const jsonUserCredentials = JSON.stringify(userCredentials);

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
      jsonUserCredentials
    );

    return { success: true, payload: data };
  } catch (err) {
    return { success: false, error: err };
  }
}

//check for email/username conflicts before signing up
export async function checkUserSignupConflicts(
  email: string,
  username: string
) {
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
        body: JSON.stringify({ emailInput: email, usernameInput: username }),
      }
    );

    console.log("RPC returned data", userIdentifierData);
    const { emailTaken, usernameTaken } = userIdentifierData || {};

    //return userIdentifierData;
    if (userIdentifierData.emailTaken || userIdentifierData.usernameTaken) {
      const signupError = createActionResult("failure", {
        actionType: "createUser",
        submitError: {
          email: emailTaken ? "Email taken." : null,
          username: usernameTaken ? "Username taken." : null,
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
  profileData: UserProfileInput
): Promise<MutationResult<UserProfile>> {
  const jsonProfileData = JSON.stringify(profileData);

  try {
    const userProfile = await fetchWrapper<UserProfile>(
      `${API_URL}/userProfiles`,
      {
        method: "POST",
        headers: HEADERS.writeObject,
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

//sign up user Action
export async function signUpUserAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData) as {
    name: string;
    username: string;
    email: string;
    password: string;
  };

  const { name, username, email, password } = formValues;

  const validationErrors = handleValidationErrors<CreateUserFormValues>(
    "createUser",
    formValues
  );

  //Return early if there are validation errors
  if (validationErrors) return validationErrors;

  //check user profile conflicts
  const userProfileConflicts = await checkUserSignupConflicts(email, username);

  if (userProfileConflicts) {
    return userProfileConflicts;
  }

  //submit new user
  const result = await performActionSubmission<UserSB>("createUser", () =>
    signupUser(API_KEY, { email, password })
  );
  console.log("user signup result", result);

  if (result.submissionOutcome === "success" && result.payload) {
    //create new user profile
    await createUserProfile({
      authId: result.payload.id,
      name,
      username,
    });

    return result;
  }

  return null;
}
