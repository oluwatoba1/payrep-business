import {useState} from 'react';
import * as z from 'zod';

interface Form {
  newPin: string;
}

const useChangePinValidation = () => {
  const [newPin, setNewPin] = useState<string>('');

  // Validation schemas
  const changePinValidationSchema = z.object({
    newPin: z
      .string()
      .min(4, {message: 'Pin must be 4 digits long'})
      .max(4, {message: 'Pin must be 4 digits long'}),
  });

  const formData = {
    newPin,
  };

  const [formErrors, setFormErrors] = useState<Form>({
    newPin: '',
  });

  const validateForm = (cb: Function) => {
    try {
      changePinValidationSchema.parse(formData);
      setFormErrors({newPin: ''});
      cb();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<keyof Form, string> = {
          newPin: '',
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
    setNewPin,
  };
};

export default useChangePinValidation;
