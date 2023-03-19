import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { ReferredCheckbox } from "../checkbox-component";
import { useFormikContext } from "formik";
import { FieldData } from "../../../utils/FormTypes";
let fieldMock = {};
let metaMock = {};
let helperMock = {};
jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useFormikContext: jest.fn(),
  useField: jest.fn(() => {
    return [fieldMock, metaMock, helperMock];
  }),
}));

describe("ReferredCheckbox", () => {
  const setFieldValue = jest.fn();
  const fieldData: FieldData = {
    name: "referred",
    label: "Referred",
    type: "checkbox",
    required: false,
    description: "Checkbox for referral status",
    hidden: false,
    readOnly: false,
    title: "",
    value: "",
    maxDate: "",
    minDate: null,
  };

  beforeEach(() => {
    (useFormikContext as jest.Mock).mockReturnValue({
      setFieldValue,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the checkbox with the given label and description", () => {
    render(<ReferredCheckbox fieldData={fieldData} label="Referred" />);
    expect(screen.getByText("Referred")).toBeInTheDocument();
    expect(
      screen.getByText("Checkbox for referral status"),
    ).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("should set the checkbox value when it is clicked", () => {
    render(<ReferredCheckbox fieldData={fieldData} label="Referred" />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it("should disable the checkbox if fieldData.readOnly is true", () => {
    render(
      <ReferredCheckbox
        fieldData={{ ...fieldData, readOnly: true }}
        label="Referred"
      />,
    );
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });

  it("should not render the component if fieldData.hidden is true", () => {
    render(
      <ReferredCheckbox
        fieldData={{ ...fieldData, hidden: true }}
        label="Referred"
      />,
    );
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });
});
