import React from "react";
import "./header-footer.scss";
import { Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <div className="footer">
      <Row>
        <Col className="text-start">
          Please contact us on: 699696969
          <br />
          Service charges will be appliced based on your service provider.
        </Col>
        <Col className="text-end">2021 Exus Ltd. All right reserved.</Col>
      </Row>
    </div>
  );
}

export default Footer;
