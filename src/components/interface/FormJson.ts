export declare module FormJsonTypes {
  export interface Colors {
    backgroundColor: string;
  }

  export interface Value {
    key: string;
    value: string;
  }

  export interface Field {
    dateType: string;
    description: string;
    format: string;
    hidden: boolean;
    maxDate?: string;
    minDate?: string;
    name: string;
    readOnly: boolean;
    required: boolean;
    time: boolean;
    title: string;
    type: string;
    value: string;
    maxLength?: number;
    minLength?: number;
    placeholder: string;
    values: Value[];
    calculated?: boolean;
    maxValue?: number;
    minValue?: number;
    round?: boolean;
  }

  export interface Group {
    description: string;
    fields?: Field[];
    title: string;
  }

  export interface Form {
    groups: Group[];
  }

  export interface Item {
    code: string;
    description: string;
    form: Form;
    formId: string;
    title: string;
    type: string;
    body: string;
  }

  export interface Transition {
    condition?: any;
    priority: number;
    to: number;
  }

  export interface Action2 {
    transitions: Transition[];
    type: string;
  }

  export interface NextButton {
    action: Action2;
    title: string;
    type: string;
  }

  export interface Step {
    backButton?: any;
    description?: string;
    footer: string;
    header?: string;
    id?: number;
    items?: Item[];
    nextButton?: NextButton;
    title?: string;
  }

  export interface Action {
    id: string;
    steps: Step[];
  }

  export interface Button1 {
    action: Action;
    title: string;
    type: string;
  }

  export interface Items {
    button1?: Button1;
    description: string;
    title: string;
  }

  export interface RootObject {
    colors?: Colors;
    items?: Items;
    layoutId?: number;
    order?: number;
  }

  export interface Sides {
    colors: {
      backgroundColor: string;
    };
    items: {
      description: string;
      title: string;
    };
    layoutId: number;
    order: number;
  }
  interface SideLayoutItem {
    colors: {
      backgroundColor: string;
    };
    items: {
      description: string;
      title: string;
    };
    layoutId: number;
    order: number;
  }

  export interface DashboardPropsTypes {
    pageTitle: string;
    side?: SideLayoutItem;
    main: FormJsonTypes.RootObject[];
  }
}
