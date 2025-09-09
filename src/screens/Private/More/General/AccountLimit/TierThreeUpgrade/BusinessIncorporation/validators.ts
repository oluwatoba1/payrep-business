import {DocumentPickerResponse} from '@react-native-documents/picker';
import {useState} from 'react';
import * as z from 'zod';

interface Form {
  rcNumber: string;
  cacDocument: DocumentPickerResponse[];
  tin: string;
}

interface FormError {
  rcNumber: string;
  cacDocument: string;
  tin: string;
}

const defaultForm = {
  rcNumber: '',
  cacDocument: '',
  tin: '',
};

const useBusinessInformationValidation = (notifier: Function) => {
  const [rcNumber, setRcNumber] = useState<string>('');
  const [cacDocument, setCacDocument] = useState<DocumentPickerResponse[]>([]);
  const [tin, setTin] = useState<string>('');

  // Validation schemas
  const businessInformationValidationSchema = z.object({
    rcNumber: z.string().min(1, 'RC number is required'),
    tin: z.string().optional(),
    cacDocument: z.array(
      z.object({
        uri: z.string().min(1, 'File is required'),
        name: z.string().min(1, 'File is required'),
        type: z.string().min(1, 'File is required'),
        size: z.number().positive('File is required').optional(),
      }),
    ),
  });

  const formData = {
    rcNumber,
    cacDocument,
    tin,
  };

  const [formErrors, setFormErrors] = useState<FormError>(defaultForm);

  const validateForm = (cb: Function) => {
    try {
      businessInformationValidationSchema.parse(formData);
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
    setRcNumber,
    setCacDocument,
    setTin,
  };
};

export default useBusinessInformationValidation;
