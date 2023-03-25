import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { EndpointConfig } from "../../end-point-config";

type SavedForm = {
  dateCompleted?: string;
  firstname?: string;
  lastname?: string;
  jobTitle?: string;
  birthday?: string;
  monthlySalary?: string;
  annualSalary?: number;
  referred?: boolean;
  notes?: string;
};

export default function ViewForm() {
  const [loading, setloading] = React.useState(false);
  const [savedForm, setsavedForm] = React.useState<SavedForm>();
  const navigate = useNavigate();

  React.useEffect(() => {
    retrieveForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function retrieveForm(): Promise<void> {
    setloading(true);
    try {
      const response = await axios.get(
        `${EndpointConfig.url}${EndpointConfig.getForm}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setsavedForm(response.data);
      setloading(false);
      console.log(savedForm);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <Container className="mt-4 mb-4">
          <Row>
            <Col>
              <Table striped bordered hover>
                <tbody>
                  {savedForm &&
                    Object.keys(savedForm).map((key) => (
                      <tr key={key}>
                        <td>
                          {key.toUpperCase()}:{" "}
                          {savedForm[key as keyof SavedForm]?.toString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <div className="mx-auto ">
            <button
              type="submit"
              className="btn btn-secondary mt-1 m-lg-3"
              onClick={() => navigate("/dashboard")}
            >
              Go Back
            </button>
          </div>
        </Container>
      )}
    </>
  );
}
