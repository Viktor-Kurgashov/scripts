import { useState, useMemo } from "react";
import { Input, Checkbox, PasswordConfirm } from "@/shared/ui";
import { onInput, onBlur, onToggle, prepare, validateAll, collect } from "../../lib";
import { type Field, type Preset } from "../../types";
import { ReactLabel } from "../label";
import css from "./form-simple.module.scss";

export const FormSimple: React.FC<Preset> = ({
  fields, button,
}) => {
  const [items, setItems] = useState<Field[]>(prepare(fields));

  const on = useMemo(() => ({
    change: (value: string, name: string) => {
      setItems(prev =>
        onInput(value, name, [...prev])
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
      setItems(prev =>
        onToggle(checked, name, [...prev])
      );
    },
  }), []);

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
            ) : (field.type === 'password-confirm') ? (
              <PasswordConfirm
                key={field.name}
                label={field.label}
                name={field.name}
                placeholder={field.placeholder}
                onChange={on.change}
                error={field.error}
              />
            ) : null
        )}
      </div>

      <button className={css.button}>{button}</button>
    </form>
  );
};
