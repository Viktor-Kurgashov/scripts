import { useState, useEffect, type FC, memo } from 'react';
import { ReactLabel } from '@/features/callback/ui/label';
import { Input } from '../input';
import clsx from 'clsx';
import css from './password-confirm.module.scss';

export type PasswordConfirmData = {
  label: [string, string]
  name: string
  error?: string
  placeholder: [string, string]
};

export type PasswordConfirmProps = PasswordConfirmData & {
  onChange: (value: string, name: string) => void
  className?: string
};

/** Поле пароль / подтверждение пароля */
export const PasswordConfirm: FC<PasswordConfirmProps> = memo(function PasswordConfirm ({
  label, name, onChange, error, placeholder, className,
}) {
  const [data, setData] = useState({
    value: '',
    repeat: '',
    error: '',
  });

  const on = {
    change(value: string, name: string): void {
      const compared = data[name === 'value' ? 'repeat' : 'value'];

      setData((prev) => {
        return {
          ...prev,
          [name]: value.trim(),
          error: (value.trim() !== compared) ? 'Пароли должны совпадать' : '',
        };
      });
    },
    blur(): void {
      if (!data.value && !data.repeat) {
        setData({
          ...data,
          error: 'Пароли должны совпадать',
        });
      }
    },
  };

  useEffect(() => {
    // Вызовет onChangе когда в оба инпута введены одинаковые значения
    if (
      data.value.length &&
      data.value === data.repeat
    ) {
      onChange(data.value, name);
    }
  }, [data]);

  return (
    <div className={clsx(css.parent, className)}>
      <ReactLabel label={label[0]} error={data.error ? data.error : error}>
        <Input
          name='value'
          value={data.value}
          onChange={(value) => {
            on.change(value, 'value');
          }}
          onBlur={on.blur}
          placeholder={placeholder[0]}
          error={Boolean(data.error ? data.error : error)}
        />
      </ReactLabel>

      <ReactLabel label={label[1]} error={data.error ? data.error : error}>
        <Input
          name='repeat'
          value={data.repeat}
          onChange={(value) => {
            on.change(value, 'repeat');
          }}
          onBlur={on.blur}
          placeholder={placeholder[1]}
          error={Boolean(data.error ? data.error : error)}
        />
      </ReactLabel>
    </div>
  );
});
