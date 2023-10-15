import { FC, ReactElement } from "react";
import clsx from 'clsx';
import css from './label.module.scss';

type LabelProps = {
  className?: string,
  children: ReactElement,
  label: string,
  error: string,
};

export const ReactLabel: FC<LabelProps> = ({
  children, label, error, className,
}) => {
  const parentClassName = clsx(css.label, className);

  return (
    <label className={parentClassName}>
      <span className={css.text}>{label}</span>

      {children}

      {error && <span className={css.error}>{error}</span>}
    </label>
  );
};
