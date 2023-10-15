import { Preset } from "./types";

const base: Preset = {
  fields: [
    {
      type: 'text',
      name: 'name',
      label: 'Имя',
      placeholder: 'Name',
      validator: 'required',
    },
    {
      type: 'text',
      name: 'phone',
      label: 'Телефон',
      placeholder: 'Phone',
      validator: 'phone',
    },
    {
      type: 'checkbox',
      name: 'subscribe',
      label: 'Подписаться',
      checked: true,
      value: 'on',
    },
  ],
  title: 'Заголовок',
  button: 'Отправить',
};

export const presets = {
  base,
};
