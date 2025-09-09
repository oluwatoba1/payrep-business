import {addCommas, removeCommas} from '@utils/Helpers';
import {useState} from 'react';
import * as z from 'zod';

// Define the form interface with proper types
interface StatementForm {
  name: string;
  account: string;
  startDate: string;
  endDate: string;
  email: string;
  format: string;
  signed: boolean;
}

// Define the error interface to match the form fields
interface StatementFormErrors {
  name: string;
  account: string;
  startDate: string;
  endDate: string;
  email: string;
  format: string;
  signed: string;
}

const defaultError = {
  name: '',
  account: '',
  startDate: '',
  endDate: '',
  email: '',
  format: '',
  signed: '',
};

const useStatementFormValidation = (email: string) => {
  // Form state
  const [formData, setFormData] = useState<StatementForm>({
    name: '',
    account: '',
    startDate: '',
    endDate: '',
    email,
    format: '',
    signed: false,
  });

  // Create a more robust validation schema
  const statementFormValidationSchema = z.object({
    name: z.string().trim().min(1, 'Name is required'),
    account: z.string().trim().min(1, 'Select an account'),
    startDate: z.string().trim().min(1, 'Select a start date'),
    endDate: z.string().trim().min(1, 'Select an end date'),
    email: z.string().trim().min(1, 'Email is required'),
    format: z.string().trim().min(1, 'Format is required'),
    signed: z.boolean(),
  });

  // Form errors state
  const [formErrors, setFormErrors] =
    useState<StatementFormErrors>(defaultError);

  // Validate the form and call the callback if valid
  const validateForm = (callback: () => void) => {
    try {
      statementFormValidationSchema.parse(formData);

      setFormErrors(defaultError);

      callback();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Create a new errors object with empty strings for all fields
        const errors: StatementFormErrors = defaultError;

        // Populate errors from the validation results
        error.errors.forEach(err => {
          const field = err.path[0] as keyof StatementFormErrors;
          errors[field] = err.message;
        });

        // Update the form errors state
        setFormErrors(errors);
      }
    }
  };

  // Clear a specific error
  const clearFormError = (key: keyof StatementFormErrors) => {
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [key]: '',
    }));
  };

  // Real-time validation for individual fields
  const validateField = (field: keyof StatementFormErrors) => {
    try {
      // Create a partial schema for the specific field
      const fieldSchema = z.object({
        [field]: statementFormValidationSchema.shape[field],
      });

      // Validate just this field
      fieldSchema.parse({[field]: formData[field]});

      // Clear the error if validation passes
      clearFormError(field);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Update only the error for this field
        error.errors.forEach(err => {
          if (err.path[0] === field) {
            setFormErrors(prevErrors => ({
              ...prevErrors,
              [field]: err.message,
            }));
          }
        });
      }
    }
  };

  const onChange = (key: keyof StatementForm, value: string | boolean) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return {
    // Form data
    formData,

    // Form errors
    formErrors,

    // Validation functions
    validateForm,
    validateField,
    clearFormError,
    onChange,
  };
};

export default useStatementFormValidation;
