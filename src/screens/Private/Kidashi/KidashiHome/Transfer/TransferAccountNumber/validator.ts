import { useState } from "react";
import * as z from "zod";

interface Form {
    accountNumber: string;
}

const useAccountNumberValidation = () => {
    const [accountNumber, setAccountNumber] = useState<string>("");

    // Validation schemas
    const accountNumberValidationSchema = z.object({
        accountNumber: z
            .string()
            .min(10, { message: "Account number must be at least 10 digits" })
            .regex(/^\d{10,}$/, {
                message: "Account number must contain only digits",
            }),
    });

    const formData = {
        accountNumber,
    };

    const [formErrors, setFormErrors] = useState<Form>({ accountNumber: "" });

    const validateForm = (cb: Function) => {
        try {
            accountNumberValidationSchema.parse(formData);
            setFormErrors({ accountNumber: "" });
            cb();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors: Record<keyof Form, string> = { accountNumber: "" };
                error.errors.forEach((err) => {
                    const field = err.path[0];
                    const message = err.message;
                    errors[field as keyof Form] = message;
                });
                setFormErrors(errors);
            }
        }
    };

    const clearFormError = (key: string) =>
        setFormErrors((errors) => ({ ...errors, [key]: "" }));

    return {
        formData,
        formErrors,
        clearFormError,
        validateForm,
        setAccountNumber,
    };
};

export default useAccountNumberValidation;
