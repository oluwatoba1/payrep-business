import {useState} from 'react';
import * as z from 'zod';

interface Form {
  mobileNumber: string;
}

const useRegisterMobileValidation = () => {
  const [mobileNumber, setMobileNumber] = useState<string>('');

  // Validation schemas
  const registerMobileValidationSchema = z.object({
    mobileNumber: z
      .string()
      .min(10, 'Invalid phone number')
      .max(11, 'Invalid phone number')
      .regex(/^\d+$/, 'Invalid phone number'),
  });

  const formData = {
    mobileNumber,
  };

  const [formErrors, setFormErrors] = useState<Form>({mobileNumber: ''});

  const validateForm = (cb: Function) => {
    try {
      registerMobileValidationSchema.parse(formData);
      setFormErrors({mobileNumber: ''});
      cb();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<keyof Form, string> = {mobileNumber: ''};
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
    setMobileNumber,
  };
};

export default useRegisterMobileValidation;
