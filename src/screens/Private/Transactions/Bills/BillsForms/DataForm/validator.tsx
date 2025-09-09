import {addCommas, removeCommas} from '@utils/Helpers';
import {useState} from 'react';
import * as z from 'zod';

// Define the form interface with proper types
interface DataForm {
  tariffClass: string;
  mobileNumber: string;
  amount: string;
}

// Define the error interface to match the form fields
interface DataFormErrors {
  tariffClass: string;
  mobileNumber: string;
  amount: string;
}

const useDataFormValidation = () => {
  // Form state
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [tariffClass, setTariffClass] = useState<string>('');

  // Create a more robust validation schema
  const dataFormValidationSchema = z.object({
    mobileNumber: z.string().trim(),
    tariffClass: z.string().trim(),

    amount: z
      .string()
      .transform(val => removeCommas(val))
      .refine(val => !isNaN(Number(val)), {
        message: 'Amount must be a valid number',
      })
      .refine(val => Number(val) >= 100, {
        message: 'Amount must be at least ₦100',
      }),
  });

  // Current form data
  const formData: DataForm = {
    tariffClass,
    mobileNumber,
    amount,
  };

  // Form errors state
  const [formErrors, setFormErrors] = useState<DataFormErrors>({
    tariffClass: '',
    mobileNumber: '',
    amount: '',
  });

  // Validate the form and call the callback if valid
  const validateForm = (callback: () => void) => {
    try {
      dataFormValidationSchema.parse(formData);

      setFormErrors({
        tariffClass: '',
        mobileNumber: '',
        amount: '',
      });

      callback();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Create a new errors object with empty strings for all fields
        const errors: DataFormErrors = {
          tariffClass: '',
          mobileNumber: '',
          amount: '',
        };

        // Populate errors from the validation results
        error.errors.forEach(err => {
          const field = err.path[0] as keyof DataFormErrors;
          errors[field] = err.message;
        });

        // Update the form errors state
        setFormErrors(errors);
      }
    }
  };

  // Clear a specific error
  const clearFormError = (key: keyof DataFormErrors) => {
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [key]: '',
    }));
  };

  // Real-time validation for individual fields
  const validateField = (field: keyof DataFormErrors) => {
    try {
      // Create a partial schema for the specific field
      const fieldSchema = z.object({
        [field]: dataFormValidationSchema.shape[field],
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
    setTariffClass,
    setMobileNumber: handleMobileNumberChange,
    setAmount: handleAmountChange,
  };
};

export default useDataFormValidation;
