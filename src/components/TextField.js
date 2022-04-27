import { ErrorMessage, useField } from "formik";

export const TextField = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <div>
      <label className="form__label" htmlFor={field.name}>
        {" "}
        {label}{" "}
      </label>
      <input className="input-text" {...field} {...props} autoComplete="off" />
      <ErrorMessage name={field.name} />
    </div>
  );
};
