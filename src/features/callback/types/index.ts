import { type InputData, type CheckboxData } from "@/shared/ui";
import { type TInputValidator } from "../lib/validate";

type CheckboxField = Omit<CheckboxData, 'checked'> & {
  checked?: boolean,
  error?: string,
  validator?: TInputValidator,
};

type TextField = {
  type: InputData['type'],
  name: string,
  label?: string,
  value?: string,
  error?: string,
  validator: TInputValidator,
  placeholder?: string,
};

export type Field = CheckboxField | TextField;

export type Preset = {
  title?: string,
  fields: Array<Field>,
  button: string,
};
