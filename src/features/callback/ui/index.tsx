import { FC } from "react";
import { FormSimple } from "./form";
import { presets } from "../data";
import css from "./callback.module.scss";

type Props = {
  preset: keyof typeof presets,
};

export const Callback: FC<Props> = ({ preset }) => {
  const { title, fields, button } = presets[preset];

  return (
    <div className={css.form}>
      <div className={css.title}>{title}</div>

      <FormSimple
        fields={fields}
        button={button}
      />
    </div>
  );
};
