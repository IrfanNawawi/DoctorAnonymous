import { useState } from 'react';

type FormValues = Record<string, string>;

export const useForm = (initialValue: FormValues) => {
    const [values, setValues] = useState<FormValues>(initialValue);

    const setFormValue = (field: string, value: string) => {
        if (field === 'reset') {
            setValues(initialValue);
        }
        setValues(prevValues => ({
            ...prevValues,
            [field]: value,
        }));
    };

  return [values, setFormValue] as const;
};