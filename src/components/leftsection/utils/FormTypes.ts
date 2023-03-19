export interface FieldData {
  name: string;
  type: string;
  title: string;
  value: string;
  description?: string;
  label?: string;
  hidden?: boolean;
  readOnly?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  format?: string;
  time?: boolean;
  maxDate: string;
  minDate: string | null;
  calculated?: boolean;
  maxValue?: number;
  minValue?: number;
  round?: boolean;
  dateType?: string;
  values?: { key: string; value: string }[];
}
