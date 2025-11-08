import { FormSimple } from "./form";
import { presets } from "../data";
import clsx from 'clsx';
import css from "./callback.module.scss";

type Props = {
  preset?: keyof typeof presets,
  className?: string,
};

export const Callback: React.FC<Props> = ({
  preset = 'base', className,
}) => {
  const { title, fields, button } = presets[preset];

  return (
    <div className={clsx(css.form, className)}>
      <div className={css.title}>{title}</div>

      <FormSimple
        fields={fields}
        button={button}
      />
    </div>
  );
};
