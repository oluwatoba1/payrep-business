import { useState } from "react";
import * as z from "zod";

interface Form {
	circleName: string;
}

interface FormError {
	circleName: string;
}

const defaultForm = {
	circleName: "",
};

const useTrustCircleForm = () => {
	const [circleName, setCircleName] = useState<string>("");
	const [formErrors, setFormErrors] = useState<FormError>(defaultForm);

	const schema = z.object({
		circleName: z.string().min(1, "Circle name is required"),
	});

	const validateForm = (cb: Function) => {
		try {
			schema.parse({ circleName });
			setFormErrors(defaultForm);
			cb();
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errors: Record<keyof Form, string> = { ...defaultForm };
				error.errors.forEach((err) => {
					const field = err.path[0];
					errors[field as keyof Form] = err.message;
				});
				setFormErrors(errors);
			}
		}
	};

	const clearFormError = (key: string) =>
		setFormErrors((errors) => ({ ...errors, [key]: "" }));

	return {
		circleName,
		setCircleName,
		formErrors,
		validateForm,
		clearFormError,
	};
};

export default useTrustCircleForm;
