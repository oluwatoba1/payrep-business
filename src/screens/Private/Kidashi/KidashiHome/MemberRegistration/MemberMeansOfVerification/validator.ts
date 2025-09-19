import {useState} from 'react';
import * as z from 'zod';

interface Form {
  idNumber: string;
}

const useKycVerificationValidation = () => {
  const [idNumber, setIdNumber] = useState<string>('');

  // Validation schemas
  const idNumberValidationSchema = z.object({
    idNumber: z.string().regex(/\d{11}$/, {message: 'Enter a valid id number'}),
  });

  const formData = {
    idNumber,
  };

  const [formErrors, setFormErrors] = useState<Form>({idNumber: ''});

  const validateForm = (cb: Function) => {
    try {
      idNumberValidationSchema.parse(formData);
      setFormErrors({idNumber: ''});
      cb();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<keyof Form, string> = {idNumber: ''};
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
    setIdNumber,
  };
};

export default useKycVerificationValidation;
