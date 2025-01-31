interface InputFieldProps {
  name: string;
  id: string;
  type?: string; //
  isRequired?: boolean;
  initialValue?: string;
  describedById?: string;
}

function InputField({
  id,
  name,
  type = "text",
  isRequired = true,
  initialValue,
  describedById,
}: InputFieldProps): React.JSX.Element {
  return (
    <input
      type={type}
      name={name}
      id={id}
      aria-describedby={describedById}
      defaultValue={initialValue}
      required={isRequired}
    ></input>
  );
}

export default InputField;
