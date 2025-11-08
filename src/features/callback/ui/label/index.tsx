import { memo } from "react";
import clsx from 'clsx';
import css from './label.module.scss';

type LabelProps = React.PropsWithChildren & {
  className?: string,
  label: string,
  error: string,
};

export const ReactLabel: React.FC<LabelProps> = memo(({
  children, label, error, className,
}) => {
  const parentClassName = clsx(css.label, className);
  console.log('label');

  return (
    <label className={parentClassName}>
      <span className={css.text}>{label}</span>

      {children}

      {error && <span className={css.error}>{error}</span>}
    </label>
  );
});
