import {addCommas, removeCommas} from '@utils/Helpers';
import {useState} from 'react';
import * as z from 'zod';

// Define the form interface with proper types
interface CableForm {
  bouquetId: string;
  smartcardNumber: string;
  amount: string;
  narration?: string;
}

// Define the error interface to match the form fields
interface CableFormErrors {
  bouquetId: string;
  smartcardNumber: string;
  amount: string;
  narration?: string;
}

const useCableFormValidation = () => {
  // Form state
  const [bouquetId, setBouquetId] = useState<string>('');
  const [smartcardNumber, setSmartcardNumber] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [narration, setNarration] = useState<string>('');

  // Create a more robust validation schema
  const cableFormValidationSchema = z.object({
    smartcardNumber: z.string().trim(),
    bouquetId: z.string().trim(),

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

    narration: z
      .string()
      .trim()
      .max(100, 'Narration must be less than 100 characters')
      .optional(),
  });

  // Current form data
  const formData: CableForm = {
    bouquetId,
    smartcardNumber,
    amount,
    narration,
  };

  // Form errors state
  const [formErrors, setFormErrors] = useState<CableFormErrors>({
    bouquetId: '',
    smartcardNumber: '',
    amount: '',
    narration: '',
  });

  // Validate the form and call the callback if valid
  const validateForm = (callback: () => void) => {
    try {
      cableFormValidationSchema.parse(formData);

      setFormErrors({
        bouquetId: '',
        smartcardNumber: '',
        amount: '',
        narration: '',
      });

      callback();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Create a new errors object with empty strings for all fields
        const errors: CableFormErrors = {
          bouquetId: '',
          smartcardNumber: '',
          amount: '',
          narration: '',
        };

        // Populate errors from the validation results
        error.errors.forEach(err => {
          const field = err.path[0] as keyof CableFormErrors;
          errors[field] = err.message;
        });

        // Update the form errors state
        setFormErrors(errors);
      }
    }
  };

  // Clear a specific error
  const clearFormError = (key: keyof CableFormErrors) => {
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [key]: '',
    }));
  };

  // Real-time validation for individual fields
  const validateField = (field: keyof CableFormErrors) => {
    try {
      // Create a partial schema for the specific field
      const fieldSchema = z.object({
        [field]: cableFormValidationSchema.shape[field],
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
  const handleSmartcardNumber = (value: string) => {
    setSmartcardNumber(value);

    clearFormError('smartcardNumber');
  };

  const handleNarrationChange = (value: string) => {
    setNarration(value);
    clearFormError('narration');
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
    setBouquetId,
    setSmartcardNumber: handleSmartcardNumber,
    setAmount: handleAmountChange,
    setNarration: handleNarrationChange,
  };
};

export default useCableFormValidation;
