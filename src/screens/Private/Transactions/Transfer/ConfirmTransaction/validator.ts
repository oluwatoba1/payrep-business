import { useState } from 'react';
import * as z from 'zod';

// Define the form interface with proper types
interface PinForm {
  pin: string;
}

// Define the error interface to match the form fields
interface PinFormErrors {
  pin: string;
}

const usePinValidation = () => {
  // Form state
  const [pin, setPin] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Create a more robust validation schema
  const pinValidationSchema = z.object({
    pin: z
      .string()
      .trim()
      .regex(/^\d{4}$/, 'PIN must be exactly 4 digits'),
  });

  // Current form data
  const formData: PinForm = {
    pin
  };

  // Form errors state
  const [formErrors, setFormErrors] = useState<PinFormErrors>({
    pin: '',
  });

  const validateForm = async (callback: (pin: string) => Promise<boolean>) => {
    try {
      pinValidationSchema.parse(formData);
      
      setFormErrors({
        pin: '',
      });
      
      setIsLoading(true);
      
      try {
        const success = await callback(pin);
        
        if (!success) {
          setFormErrors({
            pin: 'Invalid PIN. Please try again',
          });
          setPin('');
        }
        
        return success;
      } catch (error) {
        setFormErrors({
          pin: 'An error occurred. Please try again',
        });
        setPin('');
        return false;
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: PinFormErrors = {
          pin: '',
        };
        
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof PinFormErrors;
          errors[field] = err.message;
        });
        
        setFormErrors(errors);
      }
      return false;
    }
  };

  // Clear a specific error
  const clearFormError = (key: keyof PinFormErrors) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [key]: '',
    }));
  };

  const validateField = (field: keyof PinFormErrors) => {
    try {
      const fieldSchema = z.object({
        [field]: pinValidationSchema.shape[field],
      });
      fieldSchema.parse({ [field]: formData[field] });
      
      
      clearFormError(field);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          if (err.path[0] === field) {
            setFormErrors((prevErrors) => ({
              ...prevErrors,
              [field]: err.message,
            }));
          }
        });
      }
      return false;
    }
  };

  // Handle pin change
  const handlePinChange = (value: string) => {
    setPin(value);
    clearFormError('pin');
  };

  // Reset the form
  const resetForm = () => {
    setPin('');
    setFormErrors({
      pin: '',
    });
  };

  return {
    // Form data
    pin,
    formData,
    isLoading,
    
    // Form errors
    formErrors,
    
    // Validation functions
    validateForm,
    validateField,
    clearFormError,
    
    // Form actions
    setPin: handlePinChange,
    resetForm,
  };
};

export default usePinValidation;
