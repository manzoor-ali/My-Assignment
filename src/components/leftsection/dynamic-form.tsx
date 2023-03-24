import React from "react";
import { Form, FormikProps, Formik } from "formik";
import { generateValidationSchema } from "./dynamic-form-components/form-validation-driver";
import { RenderFormField } from "./dynamic-form-components/form-component-driver";
import { Col, Row } from "react-bootstrap";
import { FieldData } from "./utils/FormTypes";
import axios from "axios";
import { EndpointConfig } from "../../end-point-config";
import { FormJsonTypes, Button } from "../interface/FormJson";
import ButtonComponent from "./dynamic-form-components/form-components/buttons-component";

interface Props {
  fromFieldData: FormJsonTypes.Step;
  goToStep: (arg0: string) => void;
}

type submittionFormData = {
  dateCompleted: string;
  firstname: string;
  lastname: string;
  jobTitle: string;
  birthday: string;
  monthlySalary: string;
  annualSalary: number;
  referred: boolean;
  notes: string;
};

const DynamicForm: React.FC<Props> = ({ fromFieldData, goToStep }) => {
  const initialValues: {
    [key: string]: object | string | number | boolean | null | undefined;
  } = {};

  const {
    items: [
      {
        form: {
          groups: [{ fields }],
        },
      },
    ],
    nextButton,
    backButton,
    title,
    description,
  }: FormJsonTypes.Step = fromFieldData || {};

  React.useEffect(() => {
    if (fromFieldData) {
      fromFieldData?.items[0].form.groups[0].fields.forEach((field) => {
        initialValues[field.name] = field.value ?? "";
      });
    }
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  async function postsubmittionFormData(
    submittionformData: submittionFormData,
  ): Promise<void> {
    try {
      const response = await axios.post(
        `${EndpointConfig.url}${EndpointConfig.submit}`,
        submittionformData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );
      goToStep("next");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h4>{title}</h4>
      <p>{description}</p>
      <Formik
        initialValues={initialValues as unknown as FieldData}
        validationSchema={generateValidationSchema(fields as FieldData[])}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          postsubmittionFormData(values as unknown as submittionFormData);
        }}
      >
        {(props: FormikProps<FieldData>) => (
          <Form>
            <Row>
              <Col lg="8" className="dynamic-form-wrapper">
                {fields.map((fieldData: FormJsonTypes.Field) =>
                  RenderFormField(fieldData as FieldData),
                )}
              </Col>
              {nextButton || backButton ? (
                <ButtonComponent
                  formikPropsData={props as FormikProps<FieldData>}
                  nextButtonData={nextButton as Button}
                  backButtonData={backButton as Button}
                />
              ) : (
                ""
              )}
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DynamicForm;
