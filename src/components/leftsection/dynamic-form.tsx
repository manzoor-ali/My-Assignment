import React from "react";
import { Form, FormikProps, Formik } from "formik";
import { generateValidationSchema } from "./dynamic-form-components/form-validation-driver";
import { RenderFormField } from "./dynamic-form-components/form-component-driver";
import { Col, Row } from "react-bootstrap";
import { FieldData } from "./utils/FormTypes";
import axios from "axios";
import { EndpointConfig } from "../../end-point-config";

interface Props {
  fromFieldData: FieldData[];
  formSubmittedCallBack: (formData: boolean) => void;
}

type FormData = {
  dateCompleted: string; // assuming this is a UTC timestamp in ISO format
  firstname: string;
  lastname: string;
  jobTitle: string;
  birthday: string; // assuming this is a UTC timestamp in ISO format
  monthlySalary: string; // assuming this is a string representation of a number
  annualSalary: number;
  referred: boolean;
  notes: string;
};

const DynamicForm: React.FC<Props> = ({
  fromFieldData,
  formSubmittedCallBack,
}) => {
  const initialValues: {
    [key: string]: object | string | number | boolean | null | undefined;
  } = {};
  if (fromFieldData) {
    fromFieldData.forEach((field) => {
      initialValues[field.name] = field.value ?? "";
    });
  }

  async function postFormData(formData: FormData): Promise<void> {
    try {
      const response = await axios.post(
        `${EndpointConfig.url}${EndpointConfig.submit}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );
      formSubmittedCallBack(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Formik
        initialValues={initialValues as unknown as FieldData}
        validationSchema={generateValidationSchema(fromFieldData)}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          postFormData(values as unknown as FormData);
        }}
      >
        {(props: FormikProps<FieldData>) => (
          <Form>
            <Row>
              <Col lg="8" className="dynamic-form-wrapper">
                {fromFieldData.map((field: FieldData) =>
                  RenderFormField(field),
                )}
              </Col>
            </Row>
            <div className="proceed-form-btn">
              <button type="submit" className="btn btn-primary mt-4 m-lg-3">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DynamicForm;
