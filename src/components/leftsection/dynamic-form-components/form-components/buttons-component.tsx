import React from "react";
import { Row, Col } from "react-bootstrap";
import { Button } from "../../../interface/FormJson";
import { FormikProps } from "formik";
import { FieldData } from "../../utils/FormTypes";

interface Props {
  nextButtonData: Button;
  backButtonData: Button;
  formikPropsData?: FormikProps<FieldData>;
  goToStep?: (arg0: string) => void;
}

const ButtonComponent: React.FC<Props> = ({
  nextButtonData,
  backButtonData,
  formikPropsData,
  goToStep,
}) => {
  return (
    <>
      <Row className="proceed-form-btn">
        {backButtonData ? (
          <Col className="text-start">
            <button
              type={backButtonData.type}
              className="btn btn-primary mt-4 m-s-lg-3"
              onClick={() => {
                if (formikPropsData) {
                  formikPropsData.submitForm();
                } else if (goToStep) {
                  goToStep("back");
                }
              }}
            >
              {backButtonData.title}
            </button>
          </Col>
        ) : nextButtonData ? (
          <Col className="text-end">
            <button
              type={nextButtonData.type}
              onClick={() => {
                if (formikPropsData) {
                  formikPropsData.submitForm();
                } else if (goToStep) {
                  goToStep("next");
                }
              }}
              className="btn btn-primary mt-4 m-lg-3"
              disabled={
                formikPropsData
                  ? Boolean(formikPropsData.isSubmitting) ||
                    Boolean(!formikPropsData.isValid)
                  : false
              }
            >
              {nextButtonData.title}
            </button>
          </Col>
        ) : (
          ""
        )}
      </Row>
    </>
  );
};
export default ButtonComponent;
