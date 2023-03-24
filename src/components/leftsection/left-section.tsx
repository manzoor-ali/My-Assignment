import React from "react";
import Registrationform from "./registration-form";
import { FormJsonTypes } from "../interface/FormJson";
import "./left-section.scss";

export interface Props {
  mainData: FormJsonTypes.RootObject[];
}

const LeftSection: React.FC<Props> = ({ mainData }) => {
  const { colors, layoutId }: FormJsonTypes.RootObject = mainData[0];

  return (
    <div className="left-section" style={colors} key={layoutId}>
      <Registrationform formData={mainData[0] as FormJsonTypes.RootObject} />
    </div>
  );
};

export default LeftSection;
