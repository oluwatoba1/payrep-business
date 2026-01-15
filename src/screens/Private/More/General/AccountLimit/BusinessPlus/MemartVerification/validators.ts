import {DocumentPickerResponse} from '@react-native-documents/picker';
import {useState} from 'react';
import * as z from 'zod';

interface Form {
  memartDocument: DocumentPickerResponse[];
}

interface FormError {
  memartDocument: string;
}

const defaultForm = {
  memartDocument: '',
};

const useMemartVerificationValidation = (notifier: Function) => {
  const [memartDocument, setMemartDocument] = useState<DocumentPickerResponse[]>([]);

  // Validation schemas
  const memartVerificationValidationSchema = z.object({
    memartDocument: z.array(
      z.object({
        uri: z.string().min(1, 'File is required'),
        name: z.string().min(1, 'File is required'),
        type: z.string().min(1, 'File is required'),
        size: z.number().positive('File is required').optional(),
      }),
    ),
  });

  const formData = {
    memartDocument,
  };

  const [formErrors, setFormErrors] = useState<FormError>(defaultForm);

  const validateForm = (cb: Function) => {
    try {
      memartVerificationValidationSchema.parse(formData);
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
    setMemartDocument,
  };
};

export default useMemartVerificationValidation;
