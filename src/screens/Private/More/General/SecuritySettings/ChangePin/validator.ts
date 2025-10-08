import {useState} from 'react';
import * as z from 'zod';

interface Form {
  currentPin: string;
  newPin: string;
}

const useChangePinValidation = () => {
  const [currentPin, setCurrentPin] = useState<string>('');
  const [newPin, setNewPin] = useState<string>('');

  // Validation schemas
  const changePinValidationSchema = z.object({
    currentPin: z
      .string()
      .min(4, {message: 'Pin must be 4 digits long'})
      .max(4, {message: 'Pin must be 4 digits long'}),
    newPin: z
      .string()
      .min(4, {message: 'Pin must be 4 digits long'})
      .max(4, {message: 'Pin must be 4 digits long'}),
  });

  const formData = {
    currentPin,
    newPin,
  };

  const [formErrors, setFormErrors] = useState<Form>({
    currentPin: '',
    newPin: '',
  });

  const validateForm = (cb: Function) => {
    try {
      changePinValidationSchema.parse(formData);
      setFormErrors({currentPin: '', newPin: ''});
      cb();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<keyof Form, string> = {
          currentPin: '',
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
    setCurrentPin,
    setNewPin,
  };
};

export default useChangePinValidation;
