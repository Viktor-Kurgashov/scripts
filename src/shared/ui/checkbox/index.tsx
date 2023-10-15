import { FC } from "react";
import { Svg } from "../svg";
import clsx from 'clsx';
import css from "./checkbox.module.scss";

export type CheckboxData = {
  type?: 'checkbox',
  label: string,
  name: string,
  value: string,
  checked: boolean,
  disabled?: boolean,
};

type CheckboxProps = CheckboxData & {
  onChange: (checked: boolean, name: string) => void,
  className?: string,
};

export const Checkbox: FC<CheckboxProps> = ({
  label, name, value, onChange, checked, disabled, className,
}) => {
  const toggle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.checked, name);
  };

  return (
    <label className={clsx(css.checkbox, className)}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={toggle}
        className={css.input}
      />

      <Svg
        id="checkmark"
        className={css.icon}
      />

      <span className={css.label}>{label}</span>
    </label>
  );
};
