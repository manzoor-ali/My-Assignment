import * as Yup from "yup";
import { FieldData } from "../utils/FormTypes";
export const generateValidationSchema = (fieldData: FieldData[]) => {
  const fields: any = {};

  fieldData.forEach((field) => {
    if (field.type === "1" && field.maxLength) {
      const stringValidator = Yup.string()
        .max(
          field.maxLength,
          `${field.title} must be at most ${field.maxLength} characters long`,
        )
        .min(
          field.minLength ?? 0,
          `${field.title} must be at least ${field.minLength} characters long`,
        );

      fields[field.name] = field.required
        ? stringValidator.required(`${field.title} is required`)
        : stringValidator;
    }

    if (field.type === "2") {
      fields[field.name] = Yup.boolean();
    }
    if (field.type === "3" && field.values) {
      fields[field.name] = Yup.string().required("Please select an option");
    }

    if (field.type === "5" && field.maxValue && field.calculated === false) {
      const stringValidator = Yup.string()
        .test(
          `min-${field.minValue}`,
          `${field.title} must be greater than or equal to ${field.minValue} `,
          function (value) {
            return Number(value) >= Number(field.minValue);
          },
        )
        .test(
          `max-${field.maxValue}`,
          `${field.title} must be less than or equal to ${field.maxValue} `,
          function (value) {
            return Number(value) <= Number(field.maxValue);
          },
        );

      fields[field.name] = field.required
        ? stringValidator.required(`${field.title} is required`)
        : stringValidator;
    }
  });
  return Yup.object().shape(fields);
};
