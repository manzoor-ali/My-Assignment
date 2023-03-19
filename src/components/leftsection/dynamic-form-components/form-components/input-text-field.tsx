import React from "react";
import { useField, useFormikContext } from "formik";
import { FieldData } from "../../utils/FormTypes";

interface MyTextFieldProps {
  fieldData: FieldData;
  label: string;
}
export const CustomTextField: React.FC<MyTextFieldProps> = ({
  fieldData,
  label,
}: MyTextFieldProps) => {
  const [field, meta] = useField(fieldData);
  const { setFieldValue } = useFormikContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(field.name, event.target.value);
  };
  if (fieldData.hidden) {
    return null;
  }
  return (
    <>
      <div className="field-wraper">
        <label>{label}</label>
        <input
          {...field}
          value={field.value}
          onChange={handleChange}
          disabled={fieldData.readOnly}
          required={fieldData.required}
          placeholder={fieldData.placeholder}
          type="text"
          className={meta.touched && meta.error ? "error-border" : ""}
        />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
        <div className="small-desc">{fieldData.description}</div>
      </div>
    </>
  );
};
