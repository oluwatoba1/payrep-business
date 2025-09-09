import {useState} from 'react';
import * as z from 'zod';

interface Form {
  password: string;
}

const useRegisterPasswordValidation = () => {
  const [password, setPassword] = useState<string>('');

  // Validation schemas
  const registerPasswordValidationSchema = z.object({
    password: z
      .string()
      .min(8, {message: 'Password must be at least 8 characters long'})
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/\d/, {message: 'Password must contain at least one number'})
      .regex(/[@$#!%*?&]/, {
        message:
          'Password must contain at least one symbol (@, $, #, !, %, *, ?, &)',
      }),
  });

  const formData = {
    password,
  };

  const [formErrors, setFormErrors] = useState<Form>({password: ''});

  const validateForm = (cb: Function) => {
    try {
      registerPasswordValidationSchema.parse(formData);
      setFormErrors({password: ''});
      cb();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<keyof Form, string> = {password: ''};
        error.errors.forEach(err => {
          const field = err.path[0];
          const message = err.message;
          errors[field as keyof Form] = message;
        });
        setFormErrors(errors);
      }
    }
  };

  const clearFormError = (key: string) =>
    setFormErrors(errors => ({...errors, [key]: ''}));

  return {
    formData,
    formErrors,
    clearFormError,
    validateForm,
    setPassword,
  };
};

export default useRegisterPasswordValidation;
