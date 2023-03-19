import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { useField, useFormikContext } from "formik";
import { FieldData } from "../../../utils/FormTypes";
import { CustomTextField } from "../input-text-field";

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useFormikContext: jest.fn(),
  useField: jest.fn(),
}));

describe("CustomTextField", () => {
  const setFieldValue = jest.fn();
  const fieldMock = { name: "test", value: "" };
  const metaMock = { touched: false, error: undefined };
  const helpersMock = { setValue: jest.fn() };
  const fieldData: FieldData = {
    name: "test",
    label: "Test",
    type: "text",
    required: true,
    description: "Test Description",
    hidden: false,
    readOnly: false,
    title: "",
    value: "",
    placeholder: "Test Placeholder",
    maxDate: "",
    minDate: null,
  };

  beforeEach(() => {
    (useField as jest.Mock).mockReturnValue([fieldMock, metaMock, helpersMock]);
    (useFormikContext as jest.Mock).mockReturnValue({
      setFieldValue,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the input field with the given label and description", () => {
    render(<CustomTextField fieldData={fieldData} label="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Test Placeholder")).toBeInTheDocument();
  });

  it("should set the field value when it is changed", () => {
    render(<CustomTextField fieldData={fieldData} label="Test" />);
    const input = screen.getByPlaceholderText("Test Placeholder");
    fireEvent.change(input, { target: { value: "test value" } });
    expect(setFieldValue).toHaveBeenCalledWith(fieldData.name, "test value");
  });

  it("should not render the component if fieldData.hidden is true", () => {
    render(
      <CustomTextField
        fieldData={{ ...fieldData, hidden: true }}
        label="Test"
      />,
    );
    expect(
      screen.queryByPlaceholderText("Test Placeholder"),
    ).not.toBeInTheDocument();
  });

  it("should render an error message if the field is touched and has an error", () => {
    const errorMock = { touched: true, error: "Test Error" };
    (useField as jest.Mock).mockReturnValue([
      fieldMock,
      errorMock,
      helpersMock,
    ]);
    render(<CustomTextField fieldData={fieldData} label="Test" />);
    const input = screen.getByPlaceholderText("Test Placeholder");
    fireEvent.blur(input);
    expect(screen.getByText("Test Error")).toBeInTheDocument();
  });

  it("should not render an error message if the field is not touched or has no error", () => {
    const noErrorMock = { touched: false, error: undefined };
    (useField as jest.Mock).mockReturnValue([
      fieldMock,
      noErrorMock,
      helpersMock,
    ]);
    render(<CustomTextField fieldData={fieldData} label="Test" />);
    const input = screen.getByPlaceholderText("Test Placeholder");
    fireEvent.blur(input);
    expect(screen.queryByText("Test Error")).not.toBeInTheDocument();
  });
});
