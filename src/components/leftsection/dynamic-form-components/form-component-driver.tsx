import React from "react";
import { CustomTextField } from "./form-components/input-text-field";
import { CustomSelectField } from "./form-components/select-component";
import { ReferredCheckbox } from "./form-components/checkbox-component";
import { MonthlySalary } from "./form-components/monthly-salary-component";
import { DatePickerComponent } from "./form-components/date-picker-component";
import { FieldData } from "../utils/FormTypes";
import "react-datepicker/dist/react-datepicker.css";

export const RenderFormField = (field: FieldData) => {
  if (field.type === "1") {
    return (
      <CustomTextField key={field.name} fieldData={field} label={field.title} />
    );
  }
  if (field.type === "2") {
    return (
      <ReferredCheckbox
        key={field.name}
        fieldData={field}
        label={field.title}
      />
    );
  }
  if (field.type === "3") {
    return <CustomSelectField key={field.name} fieldData={field} />;
  }
  if (field.type === "4") {
    return (
      <DatePickerComponent
        key={field.name}
        fieldData={field}
        label={field.title}
      />
    );
  }
  if (field.type === "5") {
    return (
      <MonthlySalary key={field.name} fieldData={field} label={field.title} />
    );
  }
  return null;
};
