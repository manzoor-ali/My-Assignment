import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import { FieldData } from "../../utils/FormTypes";
interface DatePickerProps {
  fieldData: FieldData;
  label: string;
}

export const DatePickerComponent: React.FC<DatePickerProps> = ({
  fieldData,
  label,
}: DatePickerProps) => {
  const [field, meta, helpers] = useField({
    name: fieldData.name,
    type: "text",
  });

  const { setFieldValue } = useFormikContext();

  const handleChange = (date: Date) => {
    const newValue = fieldData.hidden ? new Date() : date;
    helpers.setValue(newValue);
    setFieldValue(field.name, newValue);
  };

  React.useEffect(() => {
    if (fieldData.hidden) {
      handleChange(new Date());
    }
  }, []);

  if (fieldData.hidden) {
    return null;
  }

  return (
    <>
      <div className="field-wraper">
        <div className="calendar-icon-right">
          <img
            src={require("../../../../assets/images/calendar_icon.svg").default}
            alt="calendar ico"
          />
        </div>
        <label>{label}</label>
        <DatePicker
          selected={field.value}
          onChange={handleChange}
          dateFormat={fieldData.format}
          maxDate={new Date(fieldData.maxDate)}
          minDate={fieldData.minDate ? new Date(fieldData.minDate) : undefined}
          disabled={fieldData.readOnly}
          required={fieldData.required}
          showTimeSelect={fieldData.time}
          placeholderText="DD/MM/YYYY"
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
