import { ActionFunctionArgs, redirect } from "react-router-dom";
import { API_KEY } from "../services/apiFeedback";
import {
  handleValidationErrors,
  performActionSubmission,
} from "../utils/helpers";
import { UserSB } from "../types/supabaseAuth.types";
import {
  checkUserSignupConflicts,
  createUserProfile,
  signupUser,
} from "../services/apiUserSignup";
import {
  CreateUserFormValues,
  UserProfileFormValues,
} from "../types/form.types";
import { UserProfile } from "../types/user.types";

//Sign up user action function
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
  const userProfileConflicts = await checkUserSignupConflicts(email);

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
    // await createUserProfile({
    //   authId: result.payload.id,
    //   name,
    //   username,
    // });

    return result;
  }

  return null;
}

//create user profile action
export async function createUserProfileAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData) as {
    name: string;
    username: string;
  };

  const { name, username } = formValues;

  const validationErrors = handleValidationErrors<UserProfileFormValues>(
    "createUser",
    formValues
  );

  //this is not the ideal way to get the authID - refactor later
  const authSessionRaw = localStorage.getItem("auth_session");
  const authSession = JSON.parse(authSessionRaw as string);
  const authId = authSession.user.id;
  const accessToken = authSession.access_token;
  //Return early if there are validation errors
  if (validationErrors) return validationErrors;

  //create user profile
  const result = await performActionSubmission<UserProfile>("createUser", () =>
    createUserProfile(accessToken, { name, username, authId })
  );
  console.log("user signup result", result);

  if (result.submissionOutcome === "success") {
    return result;
  }

  return null;
}
