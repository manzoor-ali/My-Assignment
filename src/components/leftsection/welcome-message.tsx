import React from "react";
import { Button } from "react-bootstrap";

interface Props {
  proceedToForm: (arg0: boolean) => void;
  welcomeDescription: string;
}

const Welcomemessage: React.FC<Props> = ({
  proceedToForm,
  welcomeDescription,
}) => {
  return (
    <>
      <div className="fill-form-message">
        <h3>Employee registration form</h3>
        <p>{welcomeDescription}</p>
      </div>
      <div className="proceed-form-btn">
        <Button variant="primary" onClick={() => proceedToForm(true)}>
          Fill now
        </Button>
      </div>
    </>
  );
};

export default Welcomemessage;
