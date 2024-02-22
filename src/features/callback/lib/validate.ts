const regexp = {
  email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
  phone: /^\w{11}$/,
  password: /^[a-z0-9]{6,}$/i,
};

const schemas = {
  email(value: string) {
    if (!regexp.email.test(value)) {
      return 'Проверьте E-mail';
    }
  },
  phone(value: string) {
    if (!regexp.phone.test(value)) {
      return 'Проверьте пароль';
    }
  },
  password(value: string) {
    if (!regexp.password.test(value)) {
      return 'Проверьте пароль';
    }
  },
  required(value: string) {
    if (!value.length) {
      return 'Обязательное поле';
    }
  },
};

export type TInputValidator = keyof typeof schemas;

export const validate = (
  scheme: TInputValidator,
  value: string
): string | null => {
  if (scheme in schemas) {
    return schemas[scheme](value);
  }
};
