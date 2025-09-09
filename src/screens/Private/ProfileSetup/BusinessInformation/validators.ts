import {useState} from 'react';
import * as z from 'zod';

interface Form {
  businessName: string;
  businessDescription: string;
  businessAddress: string;
}

interface FormError {
  businessName: string;
  businessDescription: string;
  businessAddress: string;
}

const defaultForm = {
  businessName: '',
  businessDescription: '',
  businessAddress: '',
};

const useBusinessInformationValidation = (notifier: Function) => {
  const [businessName, setBusinessName] = useState<string>('');
  const [businessDescription, setBusinessDescription] = useState<string>('');
  const [businessAddress, setBusinessAddress] = useState<string>('');

  // Validation schemas
  const businessInformationValidationSchema = z.object({
    businessName: z.string().min(1, 'Business name is required'),
    businessDescription: z.string().min(1, 'Business description is required'),
    businessAddress: z.string().min(1, 'Business Address is required'),
  });

  const formData = {
    businessName,
    businessDescription,
    businessAddress,
  };

  const [formErrors, setFormErrors] = useState<FormError>(defaultForm);

  const validateForm = (cb: Function) => {
    try {
      businessInformationValidationSchema.parse(formData);
      setFormErrors({
        businessName: '',
        businessDescription: '',
        businessAddress: '',
      });
      cb();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<keyof Form, string> = {
          businessName: '',
          businessDescription: '',
          businessAddress: '',
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
    setBusinessName,
    setBusinessDescription,
    setBusinessAddress,
  };
};

export default useBusinessInformationValidation;
