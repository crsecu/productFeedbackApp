import { ActionFunctionArgs } from "react-router-dom";
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
import { authenticateUser } from "../services/apiAuth";

//Sign up user action function
export async function signUpUserAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData) as {
    email: string;
    password: string;
  };

  const { email, password } = formValues;

  const validationErrors = handleValidationErrors<CreateUserFormValues>(
    "createUser",
    formValues
  );

  //Return early if there are validation errors
  if (validationErrors) return validationErrors;

  //check user profile conflicts
  const userProfileConflicts = await checkUserSignupConflicts(email);

  if (userProfileConflicts) {
    console.log("userProfileConflicts", userProfileConflicts);
    return userProfileConflicts;
  }

  //submit new user
  const result = await performActionSubmission<UserSB>("createUser", () =>
    signupUser(API_KEY, { email, password })
  );

  console.log("signup result", result);

  return result;
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
  if (!authSession) return null;

  const authId = authSession.user.id;
  const accessToken = authSession.access_token;

  //Return early if there are validation errors
  if (validationErrors) return validationErrors;

  //create user profile
  const result = await performActionSubmission<UserProfile>("createUser", () =>
    createUserProfile(accessToken, { name, username, authId })
  );

  if (result.submissionOutcome === "success") {
    return result;
  }

  return null;
}

// Login in user action function
export async function loginUserAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData) as {
    email: string;
    password: string;
  };

  const { email, password } = formValues;

  const validationErrors = handleValidationErrors<CreateUserFormValues>(
    "authenticateUser",
    formValues
  );

  //Return early if there are validation errors
  if (validationErrors) return validationErrors;

  //send user login info to supabase
  const result = await performActionSubmission<{
    accessToken: string;
    id: string;
    userData: { accessToken: string; userProfile: UserProfile | null } | null;
  }>("authenticateUser", () => authenticateUser(API_KEY, { email, password }));

  return result;
}
