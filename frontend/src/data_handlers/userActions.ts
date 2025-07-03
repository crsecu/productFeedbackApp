import { ActionFunctionArgs } from "react-router-dom";
import { AUTH_API_URL, fetchWrapperSBAuth } from "../services/apiAuth";
import { API_KEY } from "../services/apiFeedback";
import {
  handleValidationErrors,
  performActionSubmission,
} from "../utils/helpers";
import { CreateUserFormValues } from "../types/form.types";
import { UserSB } from "../types/supabaseAuth.types";
import { MutationResult } from "../types/mutation.types";

//create user API call
async function createNewUser(
  accessToken: string,
  userData: string
): Promise<MutationResult<UserSB>> {
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
      userData
    );

    return { success: true, payload: data };
  } catch (err) {
    return { success: false, error: err };
  }
}

//sign up user Action
export async function signUpUserAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData) as {
    fullName: string;
    email: string;
    password: string;
  };

  const { fullName, ...userCredentials } = formValues;

  const requestBody = JSON.stringify({
    ...userCredentials,
    data: { fullName },
  });

  const validationErrors = handleValidationErrors<CreateUserFormValues>(
    "createUser",
    formValues
  );

  //Return early if there are validation errors
  if (validationErrors) return validationErrors;

  //submit new user
  const result = await performActionSubmission<UserSB>("createUser", () =>
    createNewUser(API_KEY, requestBody)
  );

  return result;
}
