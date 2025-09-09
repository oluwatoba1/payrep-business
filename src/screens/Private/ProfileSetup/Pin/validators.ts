import {useState} from 'react';
import * as z from 'zod';

interface Form {
  pin: string;
}

const usePinValidation = () => {
  const [pin, setPin] = useState<string>('');

  // Validation schemas
  const pinValidationSchema = z.object({
    pin: z.string().min(1, 'Pin is required'),
  });

  const formData = {
    pin,
  };

  const [formErrors, setFormErrors] = useState<Form>({
    pin: '',
  });

  const validateForm = (cb: Function) => {
    try {
      pinValidationSchema.parse(formData);
      setFormErrors({
        pin: '',
      });
      cb();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<keyof Form, string> = {
          pin: '',
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
    setPin,
  };
};

export default usePinValidation;
