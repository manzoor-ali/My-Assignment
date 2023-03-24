import React from "react";
import { Button } from "react-bootstrap";
import { FormJsonTypes } from "../interface/FormJson";

interface Props {
  formData: FormJsonTypes.RootObject;
  displayFormCallback: (arg0: boolean) => void;
}

const Welcomemessage: React.FC<Props> = ({ formData, displayFormCallback }) => {
  const { items }: FormJsonTypes.RootObject = formData;

  const keys = Object.keys(items);
  const index = keys.indexOf("description");
  const topKey: string = keys[index - 1];

  return (
    <>
      <div className="fill-form-message">
        <h3>{items.title}</h3>
        <p>{items.description}</p>
      </div>
      <div className="proceed-form-btn">
        <Button
          type={items[topKey].type}
          variant="primary"
          onClick={() => displayFormCallback(false)}
        >
          {items[topKey].title}
        </Button>
      </div>
    </>
  );
};

export default Welcomemessage;
