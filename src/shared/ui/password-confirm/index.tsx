import { useState, useEffect, useMemo, useCallback, memo } from 'react';
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
export const PasswordConfirm: React.FC<PasswordConfirmProps> = memo(function PasswordConfirm ({
  label, name, onChange, error, placeholder, className,
}) {
  const [data, setData] = useState({
    value: '',
    repeat: '',
    error: '',
  });
  console.log('-password');

  const on = useMemo(() => ({
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
      setData((prev) => {
        return {
          ...data,
          error: !prev.value && !prev.repeat ? 'Пароли должны совпадать' : '',
        };
      });
    },
  }), []);

  useEffect(() => {
    // Вызовет onChangе когда в оба инпута введены одинаковые значения
    if (
      data.value.length &&
      data.value === data.repeat
    ) {
      onChange(data.value, name);
    }
  }, [data]);

  const changeRepeat = useCallback((value: string) => {
    on.change(value, 'repeat');
  }, [on]);

  const changeValue = useCallback((value: string) => {
    on.change(value, 'value');
  }, [on]);

  const repeatField = useMemo(() => {
    return (
      <Input
        name='repeat'
        value={data.repeat}
        onChange={changeRepeat}
        onBlur={on.blur}
        placeholder={placeholder[1]}
        error={Boolean(data.error ? data.error : error)}
      />
    );
  }, [data.repeat]);

  const field = useMemo(() => {
    return (
      <Input
        name='value'
        value={data.value}
        onChange={changeValue}
        onBlur={on.blur}
        placeholder={placeholder[0]}
        error={Boolean(data.error ? data.error : error)}
      />
    );
  }, [data.value]);

  return (
    <div className={clsx(css.parent, className)}>
      <ReactLabel label={label[0]} error={data.error ?? error}>
        {field}
      </ReactLabel>

      <ReactLabel label={label[1]} error={data.error ?? error}>
        {repeatField}
      </ReactLabel>
    </div>
  );
});
