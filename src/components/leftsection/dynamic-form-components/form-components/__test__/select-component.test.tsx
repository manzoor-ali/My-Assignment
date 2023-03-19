import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { useField, useFormikContext } from "formik";
import { FieldData } from "../../../utils/FormTypes";
import { CustomSelectField } from "../select-component";

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useFormikContext: jest.fn(),
  useField: jest.fn(),
}));

describe("CustomSelectField", () => {
  const setFieldValue = jest.fn();
  const fieldMock = { name: "test", value: "" };
  const metaMock = { touched: false, error: undefined };
  const helpersMock = { setValue: jest.fn() };
  const fieldData: FieldData = {
    name: "test",
    label: "Test",
    type: "select",
    required: true,
    description: "Test Description",
    hidden: false,
    readOnly: false,
    title: "Test Title",
    value: "",
    values: [
      { key: "1", value: "Option 1" },
      { key: "2", value: "Option 2" },
      { key: "3", value: "Option 3" },
    ],
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

  it("should render the select field with the given label and description", () => {
    render(<CustomSelectField fieldData={fieldData} />);
    expect(screen.getByLabelText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Select an option")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("should set the select value when it is changed", () => {
    render(<CustomSelectField fieldData={fieldData} />);
    const selectField = screen.getByLabelText("Test Title");
    fireEvent.change(selectField, { target: { value: "2" } });
    expect(setFieldValue).toHaveBeenCalledWith("test", "2");
  });

  it("should not render the component if fieldData.hidden is true", () => {
    render(<CustomSelectField fieldData={{ ...fieldData, hidden: true }} />);
    expect(screen.queryByLabelText("Test Title")).not.toBeInTheDocument();
  });
});
