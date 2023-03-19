import * as Yup from "yup";
import { FieldData } from "../utils/FormTypes";
export const generateValidationSchema = (fieldData: FieldData[]) => {
  const fields: any = {};
  fieldData.forEach((field) => {
    if (field.required) {
      fields[field.name] = Yup.string().required(`${field.title} is required`);
    }
    if (field.type === "1" && field.maxLength) {
      fields[field.name] = Yup.string()
        .max(
          field.maxLength,
          `${field.title} must be at most ${field.maxLength} characters long`,
        )
        .min(
          field.minLength ?? 0,
          `${field.title} must be at least ${field.minLength} characters long`,
        );
    }
    if (field.type === "2") {
      fields[field.name] = Yup.boolean();
    }
    if (field.type === "3" && field.values) {
      fields[field.name] = Yup.string().required("Please select an option");
    }

    if (field.type === "5" && field.maxValue && field.calculated === true) {
      fields[field.name] = Yup.string()
        .max(
          field.maxValue,
          `${field.title} must be at most ${field.maxValue} characters long`,
        )
        .min(
          field.minValue ?? 0,
          `${field.title} must be at least ${field.minValue} characters long`,
        );
    }
  });
  return Yup.object().shape(fields);
};
