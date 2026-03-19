export type FieldConfig = {
  name: string;
  label: string;
  type: string;
  options?:{
      value: string;
      label: string;
    }[];
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  match?: string;
};

export const loginFields: FieldConfig[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    required: true,
    minLength: 6,
    maxLength: 20,
  },
];
