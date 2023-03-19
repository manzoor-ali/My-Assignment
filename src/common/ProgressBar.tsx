import React from "react";
import "./header-footer.scss";

interface ProgressBarSteps {
  isformvisible: boolean;
  isformsubmitted: boolean;
}
interface ProgressBarProps {
  steps: ProgressBarSteps;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps }) => {
  console.log(steps);
  return (
    <>
      <div className="progressbar">
        <div
          className={`inner-steps ${steps.isformvisible ? "completed" : ""}`}
        ></div>
        <div
          className={`inner-steps ${
            !steps.isformvisible && !steps.isformsubmitted ? "completed" : ""
          }`}
        ></div>

        <div
          className={`inner-steps ${steps.isformsubmitted ? "completed" : ""}`}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
