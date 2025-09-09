import { addCommas, removeCommas } from '@utils/Helpers';
import { useState } from 'react';
import * as z from 'zod';

// Define the form interface with proper types
interface TransferForm {
  accountNumber: string;
  amount: string;
  narration?: string;
}

// Define the error interface to match the form fields
interface TransferFormErrors {
  accountNumber: string;
  amount: string;
  narration?: string;
}

const useTransferValidation = () => {
  // Form state
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [narration, setNarration] = useState<string>('');

  // Create a more robust validation schema
  const transferValidationSchema = z.object({
    
    accountNumber: z
      .string()
      .trim(),
      // .regex(/^\d{10}$/, 'Account number must only contain digits'),
      // .refine(value => value.length === 10, {
      //   message: 'Account number must be exactly 10 digits',
      // }),
    
    amount: z
      .string()
      .transform(val => removeCommas(val))
      .refine((val) => !isNaN(Number(val)), {
        message: 'Amount must be a valid number',
      })
      .refine((val) => !isNaN(Number(val)), {
        message: 'Amount must be a valid number',
      })
      .refine((val) => Number(val) >= 100, {
        message: 'Amount must be at least ₦100',
      }),
    
    
    narration: z
      .string()
      .trim()
      .max(100, 'Narration must be less than 100 characters')
      .optional(),
  });

  // Current form data
  const formData: TransferForm = {
    accountNumber,
    amount,
    narration,
  };

  // Form errors state
  const [formErrors, setFormErrors] = useState<TransferFormErrors>({
    accountNumber: '',
    amount: '',
    narration: '',
  });

  // Validate the form and call the callback if valid
  const validateForm = (callback: () => void) => {
    try {
      transferValidationSchema.parse(formData);
      
      setFormErrors({
        accountNumber: '',
        amount: '',
        narration: '',
      });
      
      callback();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Create a new errors object with empty strings for all fields
        const errors: TransferFormErrors = {
          accountNumber: '',
          amount: '',
          narration: '',
        };
        
        // Populate errors from the validation results
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof TransferFormErrors;
          errors[field] = err.message;
        });
        
        // Update the form errors state
        setFormErrors(errors);
      }
    }
  };

  // Clear a specific error
  const clearFormError = (key: keyof TransferFormErrors) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [key]: '',
    }));
  };

  // Real-time validation for individual fields
  const validateField = (field: keyof TransferFormErrors) => {
    try {
      // Create a partial schema for the specific field
      const fieldSchema = z.object({
        [field]: transferValidationSchema.shape[field],
      });
      
      // Validate just this field
      fieldSchema.parse({ [field]: formData[field] });
      
      // Clear the error if validation passes
      clearFormError(field);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Update only the error for this field
        error.errors.forEach((err) => {
          if (err.path[0] === field) {
            setFormErrors((prevErrors) => ({
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
  const handleAccountNumberChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    setAccountNumber(numericValue);
    
    clearFormError('accountNumber');
    
    if (numericValue.length === 10) {
      validateField('accountNumber');
    }
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
    
    setAccountNumber: handleAccountNumberChange,
    setAmount: handleAmountChange,
    setNarration: handleNarrationChange,
    
  };
};

export default useTransferValidation;