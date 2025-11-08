import { memo } from 'react';
import clsx from 'clsx';
import css from './input.module.scss';

export type InputData = {
  name: string,
  value?: string,
  placeholder?: string,
};

type InputProps = InputData & {
  error: boolean,
  className?: string,
  onChange: (value: string, name: string) => void,
  onBlur: (value: string, name: string) => void,
};

export const Input: React.FC<InputProps> = memo(({
  name, value, error, placeholder, onChange, onBlur, className,
}) => {
  const parentClassName = clsx(
    css.parent,
    error && css.error,
    className,
  );
  console.warn('-input:');

  return (
    <input
      className={parentClassName}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(event) => {
        onChange(event.target.value, name);
      }}
      onBlur={(event) => {
        onBlur(event.target.value, name);
      }}
    />
  );
});
