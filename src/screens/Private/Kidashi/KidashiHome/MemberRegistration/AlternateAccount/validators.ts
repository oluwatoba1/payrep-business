import { useState } from "react";
import * as z from "zod";

interface Form {
	bankName: string;
	bankCode: string;
	accountNumber: string;
	accountName: string;
}

const useAlternateAccountValidation = () => {
	const [bankName, setBankName] = useState<string>("");
	const [bankCode, setBankCode] = useState<string>("");
	const [accountNumber, setAccountNumber] = useState<string>("");
	const [accountName, setAccountName] = useState<string>("");

	// Validation schemas
	const alternateAccountValidationSchema = z.object({
		bankName: z.string().min(1, "Bank name is required"),
		bankCode: z.string().min(1, "Bank code is required"),
		accountNumber: z.string().min(1, "Account number is required"),
		accountName: z.string().min(1, "Account name is required"),
	});

	const formData = {
		bankName,
		bankCode,
		accountNumber,
		accountName,
	};

	const [formErrors, setFormErrors] = useState<Form>({
		bankName: "",
		bankCode: "",
		accountNumber: "",
		accountName: "",
	});

	const validateForm = (cb: Function) => {
		try {
			alternateAccountValidationSchema.parse(formData);
			setFormErrors({
				bankName: "",
				bankCode: "",
				accountNumber: "",
				accountName: "",
			});
			cb();
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errors: Record<keyof Form, string> = {
					bankName: "",
					bankCode: "",
					accountNumber: "",
					accountName: "",
				};
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
		setBankName,
		setBankCode,
		setAccountNumber,
		setAccountName,
	};
};

export default useAlternateAccountValidation;
