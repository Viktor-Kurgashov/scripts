import { FC } from "react";
import { Svg } from "../svg";
import cn from "classnames";
import css from "./checkbox.module.scss";

export interface CheckboxData {
  type?: 'checkbox',
  label: string,
  name: string,
  value: string,
  disabled?: boolean,
};

type CheckboxProps = CheckboxData & {
  /** при выборе передаёт `.value`, при снятии `null` */
  onChange: (value: string | void, name: string) => void,
  className?: string,
};

export const Checkbox: FC<CheckboxProps> = ({
  label, name, value, onChange, disabled, className,
}) => {
  const toggle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = event.target;

    if (value?.length && name?.length) {
      onChange(checked ? value : null, name);
    }
  };

  return (
    <label className={cn(css.checkbox, className)}>
      <input
        type="checkbox"
        name={name}
        value={value}
        disabled={disabled}
        onChange={toggle}
        className={css.input}
      />

      <Svg
        id="checkmark"
        className={css.icon}
      />

      <span className={cn("t2", css.label)}>{label}</span>
    </label>
  );
};
