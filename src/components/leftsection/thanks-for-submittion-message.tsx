import React from "react";
import { FormJsonTypes, Button } from "../interface/FormJson";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./dynamic-form-components/form-components/buttons-component";

interface Props {
  fromFieldData: FormJsonTypes.Step;
  goToStep: (arg0: string) => void;
}
const Thanksforsubmittion: React.FC<Props> = ({ fromFieldData, goToStep }) => {
  const navigate = useNavigate();
  const { title, items, description, nextButton, backButton } =
    fromFieldData || {};

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      {items.map((item, index) => (
        <div key={index}>
          <p>{item.description}</p>
          {item.type === "html" && (
            <div dangerouslySetInnerHTML={{ __html: item.body }} />
          )}
        </div>
      ))}
      <div className="mx-auto mt-4">
        {nextButton || backButton ? (
          <ButtonComponent
            nextButtonData={nextButton as Button}
            backButtonData={backButton as Button}
            goToStep={goToStep}
          />
        ) : (
          ""
        )}
        {/*@Note: This will be removed.  This button is just dummy button to just navigate to view saved form */}
        <div className="to-be-removed-button">
          <button
            type="submit"
            className="btn btn-secondary mt-4 m-lg-3"
            onClick={() => navigate("/viewform")}
          >
            View Submitted Form
          </button>
        </div>
      </div>
    </div>
  );
};
export default Thanksforsubmittion;
