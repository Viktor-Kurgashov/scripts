import { type Field } from '../types';
import { validate } from './validate';

/**
 * Обработчик `onChange` текстового инпута
 */
export const onInput = (
  value: string, name: string, fields: Field[],
): Field[] => {
  return fields.map(field =>
    field.name !== name
      ? field
      : ('error' in field)
        ? { ...field, value, error: validate(field.validator, value) }
        : { ...field, value }
  );
};

/**
 * Обработчик `onChange` чекбокса
 */
export const onToggle = (
  checked: boolean, name: string, fields: Field[],
): Field[] => {
  return fields.map(field =>
    field.name !== name
      ? field
      : { ...field, checked }
  );
};

/**
 * Обработчик `onBlur` текстового инпута
 */
export const onBlur = (
  value: string, name: string, fields: Field[],
): Field[] => {
  const current = {
    ...fields.find(field => field.name === name),
    value: value.trim(),
  };

  const error = validate(current.validator, value);

  if (
    error !== current.error ||
    !current.value.length
  ) {
    return fields.map(field =>
      (field.name !== name)
        ? field
        : { ...current, error }
    );
  }
};

/**
 * Подготавливает поля из пропсов
 */
export const prepare = (fields: Field[]): Field[] => {
  return fields.map(field => {
    switch (field.type) {
      case 'text':
      case 'phone':
      case 'email':
      case 'password-confirm':
        return {
          ...field,
          value: field.value ?? '',
        };
      default:
        return field;
    }
  });
};

/**
 * Валидирует все поля
 */
export const validateAll = (fields: Field[]): Field[] | void => {
  const result = fields
    .slice()
    .map(field => ({
      ...field,
      error: field.validator
        ? validate(field.validator, field.value)
        : null,
      value: field.value.trim(),
    }));

  return (result.find(field => field.error)) ? result : null;
};

/**
 * Собирает введёные значения в объект
 */
export const collect = (fields: Field[]): Object => {
  return fields.reduce<Object>((result, field) => {
    switch (field.type) {
      case 'text':
      case 'phone':
      case 'email':
      case 'password-confirm':
        return {
          ...result,
          [field.name]: field.value,
        };
      case 'checkbox':
        return !field.checked
          ? result
          : { ...result, [field.name]: field.value };
      default:
        return result;
    }
  }, {});
};
