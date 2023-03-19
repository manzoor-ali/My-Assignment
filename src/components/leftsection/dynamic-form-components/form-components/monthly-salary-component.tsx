import React, { useContext } from "react";
import { useField, useFormikContext } from "formik";
import { FieldData } from "../../utils/FormTypes";
import { MyContext } from "../../../../context/my-context";

interface MonthlySalaryProps {
  fieldData: FieldData;
  label: string;
}

export const MonthlySalary: React.FC<MonthlySalaryProps> = ({
  fieldData,
  label,
}: MonthlySalaryProps) => {
  const [field, meta] = useField({
    name: fieldData.name,
    type: "number",
    minLength: fieldData.minValue,
    maxLength: fieldData.maxValue,
  });
  const { setMyMonthlySalaryValue } = useContext(MyContext);

  const monthlySalaryValue: number | null =
    useContext(MyContext).monthlySalaryValue;
  const monthlySalary = (monthlySalaryValue ?? 0) * 12;

  const { setFieldValue } = useFormikContext();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (fieldData.calculated === false)
      setFieldValue(field.name, event.target.value);
  };

  React.useEffect(() => {
    if (fieldData.calculated === false) {
      setMyMonthlySalaryValue(field.value);
    }
  }, [field, fieldData.calculated, setMyMonthlySalaryValue]);

  React.useEffect(() => {
    if (fieldData.calculated === true) {
      setFieldValue(field.name, monthlySalary);
    }
  }, [monthlySalary]);

  if (fieldData.hidden) {
    return null;
  }
  return (
    <>
      <div className="field-wraper">
        <label>{label}</label>
        <input
          {...field}
          value={fieldData.calculated ? monthlySalary : field.value}
          onChange={handleChange}
          disabled={fieldData.readOnly}
          required={fieldData.required}
          placeholder={fieldData.placeholder}
          type="number"
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
