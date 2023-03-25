import React from "react";
import "./header-footer.scss";
import { FormJsonTypes } from "../components/interface/FormJson";

interface ProgressBarProps {
  formStepNumber: number;
  allSteps: FormJsonTypes.Step[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  formStepNumber,
  allSteps,
}) => {
  return (
    <>
      <div className="progressbar">
        {allSteps.map((value: FormJsonTypes.Step, index: number) => {
          return (
            <div
              className={`inner-steps  ${
                index <= formStepNumber ? "active" : ""
              }`}
              key={index}
            ></div>
          );
        })}
      </div>
    </>
  );
};

export default ProgressBar;
