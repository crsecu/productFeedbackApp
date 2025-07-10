import { Form, useActionData, useNavigate } from "react-router-dom";
import FormField from "../feedback/FormField";
import InputField from "../feedback/InputField";
import { FormSection, PrimaryButton } from "../../styles/UIStyles";
import { act, useEffect } from "react";
import { useAppDispatch } from "../../types/redux.hooks";
import { UserProfile } from "../../types/user.types";
import { ActionResult } from "../../types/action.types";
import { setUserCredentials } from "../../store/slices/userSlice";

function WelcomeUser(): React.JSX.Element {
  const actionData = useActionData() as ActionResult<UserProfile>;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log("act", actionData);
  const { name, image, username } = actionData?.payload ?? {};

  useEffect(() => {
    if (!actionData || !actionData.payload) return;
    if (typeof name === "string" && typeof username === "string")
      dispatch(setUserCredentials({ name, image, username }));
    navigate("/", { replace: true });
  }, [actionData, dispatch, image, name, navigate, username]);

  return (
    <div>
      <p>Please provide the following information</p>

      <FormSection>
        <Form method="post">
          <FormField
            inputId={"nameSignup"}
            label={"Full Name"}
            description={"Your first and last name"}
            inputGuidanceId={""}
          >
            <InputField
              name={"name"}
              id={"nameSignup"}
              type={"text"}
              // validationError={errors}
            />
          </FormField>
          <FormField
            inputId={"usernameSignup"}
            label={"Username"}
            description={"Your username"}
            inputGuidanceId={""}
          >
            <InputField
              name={"username"}
              id={"usernameSignup"}
              type={"text"}
              // validationError={errors}
            />
          </FormField>
          <PrimaryButton type="submit">Save profile</PrimaryButton>
        </Form>
      </FormSection>
    </div>
  );
}

export default WelcomeUser;
