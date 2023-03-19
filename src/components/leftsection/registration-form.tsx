import React from "react";
import { FormJsonTypes } from "../interface/FormJson";
import DynamicForm from "./dynamic-form";
import { FieldData } from "./utils/FormTypes";

interface Props {
  formSubmittedCallBack: (arg0: boolean) => void;
  formData: FormJsonTypes.Step[];
}

const Registrationform: React.FC<Props> = ({
  formSubmittedCallBack,
  formData,
}) => {
  const formFields = formData?.[0].items?.[0].form.groups?.[0].fields;

  return (
    <>
      <div className="fill-form-message">
        <h4>{formData[0].title}</h4>
        <p>{formData[0].description}</p>
      </div>

      <div className="form-center-section">
        <DynamicForm
          fromFieldData={formFields as FieldData[]}
          formSubmittedCallBack={formSubmittedCallBack}
        />
      </div>
    </>
  );
};

export default Registrationform;
