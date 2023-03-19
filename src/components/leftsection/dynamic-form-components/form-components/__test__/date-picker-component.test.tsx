import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { useField, useFormikContext } from "formik";
import { FieldData } from "../../../utils/FormTypes";
import { DatePickerComponent } from "../date-picker-component";
jest.mock("../../../../../assets/images/calendar_icon.svg", () => "caledarIco");
jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useFormikContext: jest.fn(),
  useField: jest.fn(),
}));

jest.mock("react-datepicker", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((props) => {
    return (
      <input
        data-testid="datepicker"
        onChange={(event) => props.onChange(event.target.value)}
      />
    );
  }),
}));

describe("DatePickerComponent", () => {
  const setFieldValue = jest.fn();
  const fieldMock = { name: "test", value: "" };
  const metaMock = { touched: false, error: undefined };
  const helpersMock = { setValue: jest.fn() };
  const fieldData: FieldData = {
    name: "test",
    label: "Test",
    type: "date",
    required: true,
    description: "Test Description",
    hidden: false,
    readOnly: false,
    title: "",
    value: "",
    maxDate: "",
    minDate: null,
    format: "dd/MM/yyyy",
    time: false,
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

  it("should render the date picker with the given label and description", () => {
    render(<DatePickerComponent fieldData={fieldData} label="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByTestId("datepicker")).toBeInTheDocument();
  });

  it("should set the date value when it is changed", () => {
    render(<DatePickerComponent fieldData={fieldData} label="Test" />);
    const datepicker = screen.getByTestId("datepicker");
    fireEvent.change(datepicker, { target: { value: "2022-05-12" } });
  });

  it("should not render the component if fieldData.hidden is true", () => {
    render(
      <DatePickerComponent
        fieldData={{ ...fieldData, hidden: true }}
        label="Test"
      />,
    );
    expect(screen.queryByTestId("datepicker")).not.toBeInTheDocument();
  });
});
