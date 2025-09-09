import {useState} from 'react';
import * as z from 'zod';

interface Form {
  otp: string;
  password: string;
}

const useResetPasswordValidation = () => {
  const [otp, setOtp] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Validation schemas
  const resetPasswordValidationSchema = z.object({
    otp: z.string().min(6, {message: 'OTP must be 6 characters'}),
    password: z
      .string()
      .min(8, {message: 'Password must be at least 8 characters long'})
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/\d/, {message: 'Password must contain at least one number'})
      .regex(/[@$!%*?&]/, {
        message:
          'Password must contain at least one symbol (@, $, !, %, *, ?, &)',
      }),
  });

  const formData = {
    password,
    otp,
  };

  const [formErrors, setFormErrors] = useState<Form>({password: '', otp: ''});

  const validateForm = (cb: Function) => {
    try {
      resetPasswordValidationSchema.parse(formData);
      setFormErrors({password: '', otp: ''});
      cb();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<keyof Form, string> = {
          password: '',
          otp: '',
        };
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
    setOtp,
  };
};

export default useResetPasswordValidation;
