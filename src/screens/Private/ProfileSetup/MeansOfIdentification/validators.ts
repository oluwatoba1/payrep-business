import {DocumentPickerResponse} from '@react-native-documents/picker';
import {useState} from 'react';
import * as z from 'zod';

interface Form {
  file: DocumentPickerResponse[]; // Allow multiple files, string, or null
  documentType: string;
}

interface FormError {
  file: string;
  documentType: string;
}

const useDocumentValidation = (notifier: Function) => {
  const [file, setFile] = useState<DocumentPickerResponse[]>([]);
  const [documentType, setDocumentType] = useState<string>('');

  // Validation schema
  const documentValidationSchema = z.object({
    file: z.array(
      z.object({
        uri: z.string().min(1, 'File is required'),
        name: z.string().min(1, 'File is required'),
        type: z.string().min(1, 'File is required'),
        size: z.number().positive('File is required').optional(),
      }),
    ),
    documentType: z.string().min(1, 'Choose an ID type'),
  });

  const formData: Form = {
    file,
    documentType,
  };

  const validateForm = (cb: Function) => {
    try {
      documentValidationSchema.parse(formData);
      cb();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<keyof FormError, string> = {
          file: '',
          documentType: '',
        };
        error.errors.forEach(err => {
          const field = err.path[0];
          const message = err.message;
          errors[field as keyof FormError] = message;
        });
        Object.keys(errors).forEach((field: any) => {
          notifier('warning', errors[field as keyof FormError]);
        });
      }
    }
  };

  return {
    formData,
    validateForm,
    setFile,
    setDocumentType,
  };
};

export default useDocumentValidation;
