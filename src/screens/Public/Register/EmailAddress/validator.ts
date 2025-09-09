import { useState } from 'react';
import * as z from 'zod';

interface Form {
    email: string;
}

const useRegisterEmailValidation = () => {
    const [email, setEmail] = useState<string>('');

    // Validation schemas
    const registerEmailValidationSchema = z.object({
        email: z.string().email('Invalid email address'),
    });

    const formData = {
        email,
    };

    const [formErrors, setFormErrors] = useState<Form>({ email: '' });

    const validateForm = (cb: Function) => {
        try {
            registerEmailValidationSchema.parse(formData);
            setFormErrors({ email: '' });
            cb();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors: Record<keyof Form, string> = { email: '' };
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
        setFormErrors(errors => ({ ...errors, [key]: '' }));

    return {
        formData,
        formErrors,
        clearFormError,
        validateForm,
        setEmail,
    };
};

export default useRegisterEmailValidation;
