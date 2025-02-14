import { Form, useNavigation } from "react-router-dom";
import InputField from "./InputField";
import FormField from "./FormField";
import SelectField from "./SelectField";
import {
  editFormInitialValues,
  FeedbackFormErrors,
  StatusType,
} from "../../types/feedback.types";
import FormFieldError from "./FormFieldError";

interface FeedbackFormProps {
  initialValues?: editFormInitialValues;
  mode?: "create" | "edit";
  statusOptions?: StatusType[];
  errors: FeedbackFormErrors;
  onCancel: () => void;
  onDelete?: () => void;
}

const feedbackCategories = ["feature", "ui", "ux", "enhancement", "bug"];
const modeConfig = {
  create: {
    httpMethod: "post",
    mainButton: "Add Feedback",
  },
  edit: {
    httpMethod: "patch",
    mainButton: "Save Changes",
  },
} as const;

function FeedbackFormNew({
  initialValues,
  mode = "create",
  statusOptions = [],
  errors,
  onCancel,
  onDelete,
}: FeedbackFormProps): React.JSX.Element {
  const { httpMethod, mainButton } = modeConfig[mode];
  const navigation = useNavigation();
  const isSumbitting = navigation.state === "submitting";

  return (
    <Form method={httpMethod} replace>
      {mode === "edit" && (
        <input type="hidden" name="formType" value="editFeedback" />
      )}

      <FormField
        inputId="feedbackTitle"
        label="Feedback Title"
        description="Add a short, descriptive headline"
        inputGuidanceId="feedbackTitleDesc"
      >
        <InputField
          name="title"
          id="feedbackTitle"
          type="text"
          describedById="feedbackTitleDesc"
          initialValue={initialValues?.title}
        />
        <FormFieldError errorMessage={errors?.title} />
      </FormField>
      <br></br>

      <FormField
        inputId="feedbackCategory"
        label="Category"
        description="Choose a category for your feedback"
        inputGuidanceId="feedbackCategoryDesc"
      >
        <SelectField
          name="category"
          id="feedbackCategory"
          options={feedbackCategories}
          describedById="feedbackCategoryDesc"
          initialValue={initialValues?.category}
        />
      </FormField>
      <br></br>

      {/* EDIT FORM additional field */}
      {mode === "edit" && (
        <FormField
          inputId="feedbackStatus"
          label="Update Status"
          description="Change feature state"
          inputGuidanceId="feedbackStatusDesc"
        >
          <SelectField
            name="status"
            id="feedbackStatus"
            options={statusOptions}
            describedById="feedbackStatusDesc"
            initialValue={initialValues?.status}
          />
        </FormField>
      )}
      <br></br>

      <FormField
        inputId="feedbackDescription"
        label="Feedback Detail"
        description="Include any specific comments on what should be improved, added, etc."
        inputGuidanceId="feedbackDescriptionDesc"
      >
        <textarea
          name="description"
          id="feedbackDescription"
          aria-describedby="feedbackDescriptionDesc"
          maxLength={250}
          defaultValue={initialValues?.description}
          required
        />
        <FormFieldError errorMessage={errors?.description} />
      </FormField>
      <div className="form-actions">
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button disabled={isSumbitting}>
            {isSumbitting ? "submitting form..." : mainButton}
          </button>

          <button type="button" onClick={onCancel}>
            Cancel
          </button>

          {/* EDIT FORM additional button BEGINSS */}
          {mode === "edit" && onDelete && (
            <button
              type="button"
              onClick={async () => await onDelete()}
              style={{ marginRight: "auto" }}
            >
              Delete Entry
            </button>
          )}
          {/* EDIT FORM additional button ENDS */}
        </div>
      </div>
    </Form>
  );
}

export default FeedbackFormNew;
