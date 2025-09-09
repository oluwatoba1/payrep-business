import {addCommas, removeCommas} from '@utils/Helpers';
import {useState} from 'react';
import * as z from 'zod';

// Define the form interface with proper types
interface AirtimeForm {
  mobileNumber: string;
  amount: string;
}

// Define the error interface to match the form fields
interface AirtimeFormErrors {
  mobileNumber: string;
  amount: string;
}

const useAirtimeFormValidation = () => {
  // Form state
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  // Create a more robust validation schema
  const airtimeFormValidationSchema = z.object({
    mobileNumber: z.string().trim(),

    amount: z
      .string()
      .transform(val => removeCommas(val))
      .refine(val => !isNaN(Number(val)), {
        message: 'Amount must be a valid number',
      })
      .refine(val => !isNaN(Number(val)), {
        message: 'Amount must be a valid number',
      })
      .refine(val => Number(val) >= 100, {
        message: 'Amount must be at least ₦100',
      }),
  });

  // Current form data
  const formData: AirtimeForm = {
    mobileNumber,
    amount,
  };

  // Form errors state
  const [formErrors, setFormErrors] = useState<AirtimeFormErrors>({
    mobileNumber: '',
    amount: '',
  });

  // Validate the form and call the callback if valid
  const validateForm = (callback: () => void) => {
    try {
      airtimeFormValidationSchema.parse(formData);

      setFormErrors({
        mobileNumber: '',
        amount: '',
      });

      callback();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Create a new errors object with empty strings for all fields
        const errors: AirtimeFormErrors = {
          mobileNumber: '',
          amount: '',
        };

        // Populate errors from the validation results
        error.errors.forEach(err => {
          const field = err.path[0] as keyof AirtimeFormErrors;
          errors[field] = err.message;
        });

        // Update the form errors state
        setFormErrors(errors);
      }
    }
  };

  // Clear a specific error
  const clearFormError = (key: keyof AirtimeFormErrors) => {
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [key]: '',
    }));
  };

  // Real-time validation for individual fields
  const validateField = (field: keyof AirtimeFormErrors) => {
    try {
      // Create a partial schema for the specific field
      const fieldSchema = z.object({
        [field]: airtimeFormValidationSchema.shape[field],
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

  // Handle amount change with formatting
  const handleAmountChange = (value: string) => {
    setAmount(addCommas(value));

    clearFormError('amount');
  };

  // Handle account number change
  const handleMobileNumberChange = (value: string) => {
    setMobileNumber(value);

    clearFormError('mobileNumber');
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

    setMobileNumber: handleMobileNumberChange,
    setAmount: handleAmountChange,
  };
};

export default useAirtimeFormValidation;
