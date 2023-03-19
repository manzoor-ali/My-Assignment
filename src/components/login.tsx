import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { EndpointConfig } from "../end-point-config";
import "./dashboard.scss";
import { useNavigate } from "react-router-dom";
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
});
export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${EndpointConfig.url}${EndpointConfig.login}`,
        {
          username: email,
          password: password,
        },
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="container login-from-wrapper text-start">
        <Row>
          <Col lg="12">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                handleSubmit(values.email, values.password);
              }}
            >
              {({ touched, errors }) => (
                <div>
                  <Row className="mb-3">
                    <h3>Login Form</h3>
                  </Row>
                  <Form>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        data-testid="Email"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        className={`mt-2 form-control
                          ${touched.email && errors.email ? "is-invalid" : ""}`}
                      />

                      <ErrorMessage
                        component="div"
                        name="email"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password" className="mt-3">
                        Password
                      </label>
                      <Field
                        data-testid="Password"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        className={`mt-2 form-control
                          ${
                            touched.password && errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="password"
                        className="invalid-feedback"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
                    >
                      Submit
                    </button>
                  </Form>
                </div>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
}
