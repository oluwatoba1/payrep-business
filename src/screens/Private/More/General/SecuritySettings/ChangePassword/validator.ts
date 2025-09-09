import {useState} from 'react';
import * as z from 'zod';

interface Form {
  currentPassword: string;
  newPassword: string;
}

const useChangePasswordValidation = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  // Validation schemas
  const changePasswordValidationSchema = z.object({
    currentPassword: z
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
    newPassword: z
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
    currentPassword,
    newPassword,
  };

  const [formErrors, setFormErrors] = useState<Form>({
    currentPassword: '',
    newPassword: '',
  });

  const validateForm = (cb: Function) => {
    try {
      changePasswordValidationSchema.parse(formData);
      setFormErrors({currentPassword: '', newPassword: ''});
      cb();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<keyof Form, string> = {
          currentPassword: '',
          newPassword: '',
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
    setCurrentPassword,
    setNewPassword,
  };
};

export default useChangePasswordValidation;
