import { type InputData, type CheckboxData, type PasswordConfirmData } from '@/shared/ui';
import { type TInputValidator } from './lib/validate';

type TextField = InputData & {
  type: 'text' | 'phone' | 'email',
  label?: string,
  error?: string,
  validator: TInputValidator,
};

type CheckboxField = CheckboxData & {
  type: 'checkbox',
  error?: string,
  validator?: TInputValidator,
};

type ConfirmField = PasswordConfirmData & {
  type: 'password-confirm',
  value?: string,
  error?: string,
  validator?: TInputValidator,
};

export type Field = CheckboxField | ConfirmField | TextField;

export type Preset = {
  title?: string,
  fields: Array<CheckboxField | ConfirmField | TextField>,
  button: string,
};
