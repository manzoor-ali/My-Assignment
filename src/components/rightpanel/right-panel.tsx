import React from "react";
import "./right-panel.scss";
import { FormJsonTypes } from "../interface/FormJson";

interface Props {
  rightSideContent: FormJsonTypes.Sides[];
}

const RightPanel: React.FC<Props> = ({ rightSideContent }) => {
  return (
    <div className="address-section" style={rightSideContent[0].colors}>
      <div className="heading">
        <h3
          dangerouslySetInnerHTML={{
            __html: rightSideContent[0].items.title,
          }}
        />
      </div>
      <div
        className="description"
        dangerouslySetInnerHTML={{
          __html: rightSideContent[0].items.description,
        }}
      />
    </div>
  );
};
export default RightPanel;
