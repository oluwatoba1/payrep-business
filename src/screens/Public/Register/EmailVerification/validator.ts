import { useState } from 'react';
import * as z from 'zod';

interface Form {
    otp: string
}

const useVerifyMobileValidation = () => {
    const [otp, setOtp] = useState<string>('');

    // Validation schemas
    const verifyMobileValidationSchema = z.object({
        otp: z.string().regex(/^\d{6}$/, {
            message: "OTP must be exactly 6 digits",
        })
    });

    const formData = {
        otp,
    };

    const [formErrors, setFormErrors] = useState<Form>({ otp: '' });

    const validateForm = (cb: Function) => {
        try {
            verifyMobileValidationSchema.parse(formData);
            setFormErrors({ otp: '' });
            cb();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors: Record<keyof Form, string> = { otp: '' };
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
        setOtp,
    };
};

export default useVerifyMobileValidation;
