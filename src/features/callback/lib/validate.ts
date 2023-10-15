import * as Yup from 'yup';

const regexp = {
  email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
  phone: /^\w{11}$/
};

const required = Yup.string().trim().required('Обязательное поле');

const schemas = {
  required: required,
  email: required.matches(regexp.email, { message: 'Проверьте E-mail' }),
  phone: required.matches(regexp.phone, { message: 'Проверьте номер' }),
};

type validateProps = (
  scheme: TInputValidator,
  value: string,
) => string | null;

/**
 * Yup-схемы валидации для инпутов
 */
export type TInputValidator = keyof typeof schemas;

/**
 * проверяет значение через yup-схему, при ошибке вернёт сообщение
 */
export const validate: validateProps = (scheme, value) => {
  try {
    schemas[scheme].validateSync(value);
  }
  catch(err) {
    return err.message;
  }
  return null;
};
