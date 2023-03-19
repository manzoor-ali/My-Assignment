import React from "react";
import { useField, useFormikContext } from "formik";
import { FieldData } from "../../utils/FormTypes";

interface CustomSelectFieldProps {
  fieldData: FieldData;
}

export const CustomSelectField: React.FC<CustomSelectFieldProps> = ({
  fieldData,
}: CustomSelectFieldProps) => {
  const [field, meta] = useField(fieldData.name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue(field.name, event.target.value);
  };
  if (fieldData.hidden) {
    return null;
  }
  return (
    <>
      <div className="field-wraper">
        <label htmlFor={fieldData.name}>{fieldData.title}</label>
        <select
          id={fieldData.name}
          {...field}
          onChange={handleChange}
          className={meta.touched && meta.error ? "error-border" : ""}
        >
          <option value="">Select an option</option>
          {fieldData.values?.map((option) => (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          ))}
        </select>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
        <div className="small-desc">{fieldData.description}</div>
      </div>
    </>
  );
};
