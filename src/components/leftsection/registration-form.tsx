import React from "react";
import { FormJsonTypes } from "../interface/FormJson";
import DynamicForm from "./dynamic-form";
import FillFormMessage from "./welcome-message";
import ThanksForSubmissionMessage from "./thanks-for-submittion-message";
import ProgressBar from "../../common/ProgressBar";
import { addStepNumberToUrlParam } from "./helpers/addStepNumberToUrlParam";
import { useStepNumberFromQueryParam } from "./helpers/useStepNumberFromQueryParam";

interface Props {
  formData: FormJsonTypes.RootObject;
}

const Registrationform: React.FC<Props> = ({ formData }) => {
  const [formStepNumber, setfromStepNumber] = React.useState<number>(0);
  const [showWelcomeMessage, setshowWelcomeMessage] =
    React.useState<boolean>(true);

  useStepNumberFromQueryParam(setfromStepNumber);

  function displayFormCallback(): void {
    setshowWelcomeMessage(false);
  }

  const formItem =
    formData?.items?.button1?.action?.steps[formStepNumber].items[0].type;

  const isFillFormMessageExist = Boolean(
    formData?.items?.description || formData?.items?.title,
  );
  const allSteps = formData?.items?.button1?.action?.steps;

  function goToStep(stepName: string): void {
    if (stepName === "next") {
      setfromStepNumber(formStepNumber + 1);
      addStepNumberToUrlParam(formStepNumber + 1);
    } else if (stepName === "back") {
      setfromStepNumber(formStepNumber - 1);
      addStepNumberToUrlParam(formStepNumber - 1);
    }
  }

  return (
    <>
      <ProgressBar
        formStepNumber={formStepNumber}
        allSteps={allSteps as FormJsonTypes.Step[]}
      />
      {formStepNumber === 0 &&
      showWelcomeMessage &&
      formItem === "form" &&
      isFillFormMessageExist ? (
        <FillFormMessage
          formData={formData}
          displayFormCallback={displayFormCallback}
        />
      ) : formItem === "form" ? (
        <DynamicForm
          fromFieldData={
            formData?.items.button1?.action.steps[
              formStepNumber
            ] as FormJsonTypes.Step
          }
          goToStep={goToStep}
          formStepNumber={formStepNumber}
        />
      ) : formItem === "html" ? (
        <ThanksForSubmissionMessage
          fromFieldData={
            formData?.items.button1?.action.steps[
              formStepNumber
            ] as FormJsonTypes.Step
          }
          goToStep={goToStep}
        />
      ) : (
        "Step doesn't exist"
      )}
    </>
  );
};

export default Registrationform;
