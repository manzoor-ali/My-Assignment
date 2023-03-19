import React from "react";
import { FormJsonTypes } from "../interface/FormJson";
import { useNavigate } from "react-router-dom";

interface Props {
  thanksMessageData: FormJsonTypes.Step[];
}
const Thanksforsubmittion: React.FC<Props> = ({ thanksMessageData }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h3>{thanksMessageData[0].title}</h3>
      <p>{thanksMessageData[0].description}</p>
      <div className="mx-auto mt-4">
        <button
          type="submit"
          className="btn btn-secondary mt-4 m-lg-3"
          onClick={() => navigate("/viewform")}
        >
          View Submitted Form
        </button>
      </div>
    </div>
  );
};
export default Thanksforsubmittion;
