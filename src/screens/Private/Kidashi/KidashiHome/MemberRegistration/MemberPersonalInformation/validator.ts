import { useState } from "react";
import * as z from "zod";

interface Form {
	residentialAddress: string;
	state: string;
	lga: string;
	country: string;
}

const useLocationValidation = () => {
	const [residentialAddress, setResidentialAddress] = useState<string>("");
	const [state, setState] = useState<string>("");
	const [lga, setLga] = useState<string>("");
	const [country, setCountry] = useState<string>("");

	// Validation schemas
	const locationValidationSchema = z.object({
		residentialAddress: z.string().min(1, "Address is required"),
		state: z.string().min(1, "State is required"),
		lga: z.string().min(1, "LGA is required"),
		country: z.string().min(1, "Country is required"),
	});

	const formData = {
		residentialAddress,
		state,
		lga,
		country,
	};

	const [formErrors, setFormErrors] = useState<Form>({
		residentialAddress: "",
		state: "",
		lga: "",
		country: "",
	});

	const validateForm = (cb: Function) => {
		try {
			locationValidationSchema.parse(formData);
			setFormErrors({
				residentialAddress: "",
				state: "",
				lga: "",
				country: "",
			});
			cb();
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errors: Record<keyof Form, string> = {
					residentialAddress: "",
					state: "",
					lga: "",
					country: "",
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
		setResidentialAddress,
		setState,
		setLga,
		setCountry,
	};
};

export default useLocationValidation;
