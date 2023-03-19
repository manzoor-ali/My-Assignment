import React from "react";
import "./header-footer.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./header-footer.scss";
import Dropdown from "react-bootstrap/Dropdown";
import dropDownIcon from "../assets/images/user-solid.svg";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

interface Props {
  changeLaungageCallBakck: (arg0: string) => void;
}

const Header: React.FC<Props> = ({ changeLaungageCallBakck }) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="header">
      <Container>
        <Row>
          <Col className="text-start" md="auto">
            <h1>LOGO</h1>
          </Col>
          <Col className="text-center">
            <p>Assignment 13/03/2023</p>
          </Col>
          <Col md="auto">
            <Form.Select
              onChange={(e) =>
                changeLaungageCallBakck(e.target.value.toLowerCase())
              }
            >
              <option>EN</option>
              <option>FR</option>
            </Form.Select>
          </Col>
          <Col md="auto">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" className="drop-down-toggle">
                <img src={dropDownIcon} alt="toggle dropdown" />
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item href="#/action-1" active onClick={handleSelect}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
