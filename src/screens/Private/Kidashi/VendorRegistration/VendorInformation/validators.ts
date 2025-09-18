import { useState } from "react";
import * as z from "zod";

interface Form {
	businessCategory: string;
	community: string;
	state: string;
	lga: string;
}

interface FormError {
	businessCategory: string;
	community: string;
	state: string;
	lga: string;
}

const defaultForm = {
	businessCategory: "",
	community: "",
	state: "",
	lga: "",
};

const useVendorInformation = (notifier: Function) => {
	const [businessCategory, setBusinessCategory] = useState<string>("");
	const [community, setCommunity] = useState<string>("");
	const [state, setState] = useState<string>("");
	const [lga, setLga] = useState<string>("");

	// Validation schemas
	const vendorInformationSchema = z.object({
		businessCategory: z.string().min(1, "Business category is required"),
		community: z.string().min(1, "Community is required"),
		state: z.string().min(1, "State is required"),
		lga: z.string().min(1, "LGA is required"),
	});

	const formData = {
		businessCategory,
		community,
		state,
		lga,
	};

	const [formErrors, setFormErrors] = useState<FormError>(defaultForm);

	const validateForm = (cb: Function) => {
		try {
			vendorInformationSchema.parse(formData);
			setFormErrors({
				businessCategory: "",
				community: "",
				state: "",
				lga: "",
			});
			cb();
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errors: Record<keyof Form, string> = {
					businessCategory: "",
					community: "",
					state: "",
					lga: "",
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
		setBusinessCategory,
		setCommunity,
		setState,
		setLga,
	};
};

export default useVendorInformation;
