import React from "react";
import { useField, useFormikContext } from "formik";
import { FieldData } from "../../utils/FormTypes";

interface ReferredCheckboxProps {
  fieldData: FieldData;
  label: string;
  testId?: string;
}

export const ReferredCheckbox: React.FC<ReferredCheckboxProps> = ({
  fieldData,
  label,
  testId = "referred-checkbox",
}: ReferredCheckboxProps) => {
  const [field, meta] = useField({
    name: fieldData.name,
    type: "checkbox",
  });
  const { setFieldValue } = useFormikContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(field.name, event.target.checked);
  };
  if (fieldData.hidden) {
    return null;
  }
  return (
    <>
      <div className="field-wraper" data-testid={testId}>
        <label className="checkbox-wrapper ">
          <input
            {...field}
            checked={field.value}
            onChange={handleChange}
            disabled={fieldData.readOnly}
            required={fieldData.required}
            type="checkbox"
          />
          {label}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
        <div className="small-desc">{fieldData.description}</div>
      </div>
    </>
  );
};
