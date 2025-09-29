import { useState } from "react";
import * as z from "zod";

interface Form {
	businessDescription: string;
}

interface FormError {
	businessDescription: string;
}

const defaultForm = {
	businessDescription: "",
};

const useVendorItems = () => {
	const [businessDescription, setBusinessDescription] = useState<string>("");

	// Validation schemas
	const vendorItemsSchema = z.object({
		businessDescription: z.string().min(1, "Business description is required"),
	});

	const [formErrors, setFormErrors] = useState<FormError>(defaultForm);

	const validateForm = (cb: Function) => {
		try {
			vendorItemsSchema.parse(formData);
			setFormErrors({
				businessDescription: "",
			});
			cb();
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errors: Record<keyof Form, string> = {
					businessDescription: "",
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

	const formData = {
		businessDescription,
	};

	const clearFormError = (key: string) =>
		setFormErrors((errors) => ({ ...errors, [key]: "" }));

	return {
		formData,
		formErrors,
		clearFormError,
		validateForm,
		setBusinessDescription,
	};
};

export default useVendorItems;
