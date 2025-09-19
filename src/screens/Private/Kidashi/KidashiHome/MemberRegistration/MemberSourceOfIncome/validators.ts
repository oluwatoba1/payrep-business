import {useState} from 'react';
import * as z from 'zod';

interface Form {
  occupation: string;
  annualIncome: string;
  employmentType: string;
}

const useSourceOfIncomeValidation = () => {
  const [occupation, setOccupation] = useState<string>('');
  const [annualIncome, setAnnualIncome] = useState<string>('');
  const [employmentType, setEmploymentType] = useState<string>('');

  // Validation schemas
  const sourceOfIncomeValidationSchema = z.object({
    occupation: z.string().min(1, 'Occupation is required'),
    annualIncome: z.string().min(1, 'Annual income is required'),
    employmentType: z.string().min(1, 'Employment type is required'),
  });

  const formData = {
    occupation,
    annualIncome,
    employmentType,
  };

  const [formErrors, setFormErrors] = useState<Form>({
    occupation: '',
    annualIncome: '',
    employmentType: '',
  });

  const validateForm = (cb: Function) => {
    try {
      sourceOfIncomeValidationSchema.parse(formData);
      setFormErrors({
        occupation: '',
        annualIncome: '',
        employmentType: '',
      });
      cb();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<keyof Form, string> = {
          occupation: '',
          annualIncome: '',
          employmentType: '',
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
    setOccupation,
    setAnnualIncome,
    setEmploymentType,
  };
};

export default useSourceOfIncomeValidation;
