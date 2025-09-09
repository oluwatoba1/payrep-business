import {useState} from 'react';
import * as z from 'zod';

interface Form {
  dailyLimit: string;
}

const defaultForm = {
  dailyLimit: '',
};

const useIdemnityAgreementValidation = (tier: ITier) => {
  const [dailyLimit, setDailyLimit] = useState<string>('');

  // Validation schemas
  const locationValidationSchema = z.object({
    dailyLimit: z.string().optional(),
  });

  const formData = {
    dailyLimit,
  };

  const [formErrors, setFormErrors] = useState<Form>(defaultForm);

  const validateForm = (cb: Function) => {
    try {
      locationValidationSchema.parse(formData);
      setFormErrors(defaultForm);
      cb();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<keyof Form, string> = defaultForm;
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
    setDailyLimit,
  };
};

export default useIdemnityAgreementValidation;
