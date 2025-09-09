import { useState } from 'react';
import * as z from 'zod';

interface Form {
    username: string;
    password: string;
}

const useLoginValidation = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Validation schemas
    const loginValidationSchema = z.object({
        username: z.string().min(1, { message: "Username is required" }),
        password: z.string().min(1, { message: "Password is required" })
    });

    const formData = {
        username,
        password,
    };

    const [formErrors, setFormErrors] = useState<Form>({ username: '', password: '' });

    const validateForm = (cb: Function) => {
        try {
            loginValidationSchema.parse(formData);
            setFormErrors({ username: '', password: '' });
            cb();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors: Record<keyof Form, string> = { username: '', password: '' };
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
        setUsername,
        setPassword,
    };
};

export default useLoginValidation;
