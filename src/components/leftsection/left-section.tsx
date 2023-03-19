import React, { useState } from "react";
import FillFormMessage from "./welcome-message";
import Registrationform from "./registration-form";
import ThanksForSubmissionMessage from "./thanks-for-submittion-message";
import { FormJsonTypes } from "../interface/FormJson";
import "./left-section.scss";

export interface Props {
  mainData: FormJsonTypes.RootObject[];
}
const checkIfFormDoesNotExists = (
  arr: FormJsonTypes.Items,
  isFromArray: boolean,
): FormJsonTypes.Step[] | undefined =>
  arr.button1?.action.steps.filter(
    (item) =>
      item.items &&
      item.items.some((subItem) =>
        isFromArray ? subItem.form : !subItem.form,
      ),
  );

const LeftSection: React.FC<Props> = ({ mainData }) => {
  const { colors, items, layoutId }: FormJsonTypes.RootObject = mainData[0];
  const welcomeMessage = items?.button1?.action.steps[0].description as string;

  const [isVisibleFillForm, setIsVisibleFillForm] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  function setFormVisibilityState(visibilityState: boolean): void {
    setIsVisibleFillForm(visibilityState);
  }

  function formSubmittedCallBack(submittedState: boolean): void {
    setIsFormSubmitted(submittedState);
  }

  return (
    <div className="left-section" style={colors} key={layoutId}>
      {!isVisibleFillForm ? (
        <FillFormMessage
          proceedToForm={setFormVisibilityState}
          welcomeDescription={welcomeMessage}
        />
      ) : isFormSubmitted ? (
        <ThanksForSubmissionMessage
          thanksMessageData={
            checkIfFormDoesNotExists(
              items as FormJsonTypes.Items,
              false,
            ) as FormJsonTypes.Step[]
          }
        />
      ) : (
        <Registrationform
          formData={
            checkIfFormDoesNotExists(
              items as FormJsonTypes.Items,
              true,
            ) as FormJsonTypes.Step[]
          }
          formSubmittedCallBack={formSubmittedCallBack}
        />
      )}
    </div>
  );
};

export default LeftSection;
