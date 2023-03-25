import React from "react";
import Header from "../common/Header";
import { Container, Row, Col } from "react-bootstrap";
import LeftSection from "./leftsection/left-section";
import Rightpanel from "./rightpanel/right-panel";
import "./dashboard.scss";
import Footer from "../common/Footer";
import { FormJsonTypes } from "./interface/FormJson";
import axios from "axios";
import { EndpointConfig } from "../end-point-config";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    fetchFormData("en");
  }, [navigate]);

  const [loading, setLoading] = React.useState(true);
  const [formJson, setFormJson] =
    React.useState<FormJsonTypes.DashboardPropsTypes>();

  async function fetchFormData(languageName: string): Promise<void> {
    setLoading(true);
    try {
      const response = await axios.get(
        `${EndpointConfig.url}${EndpointConfig.getFormJson}`,
        {
          headers: {
            "accept-language": languageName,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setFormJson(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  function changeLaungage(languageShorCode: string): void {
    fetchFormData(languageShorCode);
  }
  function FooterMessage(): JSX.Element | null {
    if (typeof formJson !== "undefined" && "main" in formJson) {
      const footerHtml = String(
        formJson.main[0].items?.button1?.action.steps[0].footer,
      );
      return footerHtml ? (
        <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
      ) : null;
    }
    return null;
  }

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          {" "}
          <div className="header-wrapper">
            <Header changeLaungageCallBakck={changeLaungage} />
          </div>
          <div className="dashboard-wrapper">
            <Container>
              <h2
                dangerouslySetInnerHTML={{
                  __html: formJson?.pageTitle || "",
                }}
              />
              <Row>
                <Col lg="9">
                  <LeftSection
                    mainData={formJson?.main as FormJsonTypes.RootObject[]}
                    data-testid="left-section"
                  />
                </Col>
                <Col lg="3">
                  <Rightpanel
                    rightSideContent={
                      formJson?.side as unknown as FormJsonTypes.Sides[]
                    }
                    data-testid="right-section"
                  />
                </Col>
              </Row>
              <div>
                <FooterMessage />
              </div>
            </Container>
          </div>
          <div className="footer-wrapper">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
