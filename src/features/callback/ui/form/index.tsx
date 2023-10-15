import { FC, useState } from "react";
import { Input, Checkbox } from "@/shared/ui";
import { onInput, onBlur, onToggle, prepare, validateAll, collect } from "../../lib";
import { type Field } from "../../types";
import { ReactLabel } from "../label";
import css from "./form-simple.module.scss";

export type FormSimpleProps = {
  fields: Array<Field>,
  button?: string,
};

export const FormSimple: FC<FormSimpleProps> = ({
  fields, button,
}) => {
  const [items, setItems] = useState<Field[]>(prepare(fields));

  const on = {
    change: (value: string, name: string) => {
      setItems(prev =>
        onInput(value, name, prev),
      );
    },

    blur: (value: string, name: string) => {
      const res = onBlur(value, name, [...items]);

      if (Array.isArray(res)) setItems(res);
    },

    submit: async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      const res = validateAll(items);

      if (Array.isArray(res)) setItems(res);

      else console.log(collect(items));
    },

    toggle: (checked: boolean, name: string): void => {
      setItems(
        onToggle(checked, name, items)
      );
    },
  };

  return (
    <form onSubmit={on.submit}>
      <div className={css.fields}>
        {items.map(field =>
          (field.type === 'text') ? (
            <ReactLabel key={field.name} error={field.error} label={field.label}>
              <Input
                {...field}
                value={field.value}
                onChange={on.change}
                onBlur={on.blur}
                error={Boolean(field.error)}
              />
            </ReactLabel>
          ) : (field.type === 'checkbox') ? (
            <Checkbox
              key={field.name}
              label={field.label}
              name={field.name}
              value={field.value}
              checked={field.checked}
              onChange={on.toggle}
            />
          ) : null
        )}
      </div>

      <button className={css.button}>{button}</button>
    </form>
  );
};
