import { useState } from "react";
import * as z from "zod";

interface Form {
	firstName: string;
	lastName: string;
	gender: string;
	phoneNumber: string;
	dateOfBirth: string;
	state: string;
	lga: string;
	email: string;
	nin: string;
}

interface FormError {
	firstName: string;
	lastName: string;
	gender: string;
	phoneNumber: string;
	dateOfBirth: string;
	state: string;
	lga: string;
	email: string;
	nin: string;
}

const defaultForm = {
	firstName: "",
	lastName: "",
	gender: "",
	phoneNumber: "",
	dateOfBirth: "",
	state: "",
	lga: "",
	email: "",
	nin: "",
};

const useGuarantorDetails = () => {
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [gender, setGender] = useState<string>("");
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [dateOfBirth, setDateOfBirth] = useState<string>("");
	const [state, setState] = useState<string>("");
	const [lga, setLga] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [nin, setNin] = useState<string>("");

	// Validation schemas
	const vendorItemsSchema = z.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		gender: z.string().min(1, "Gender is required"),
		phoneNumber: z.string().min(1, "Phone number is required"),
		dateOfBirth: z.string().min(1, "Date of birth is required"),
		state: z.string().min(1, "State is required"),
		lga: z.string().min(1, "LGA is required"),
		email: z.string().min(1, "Email is required"),
		nin: z.string().min(1, "NIN is required"),
	});

	const formData = {
		firstName,
		lastName,
		gender,
		phoneNumber,
		dateOfBirth,
		state,
		lga,
		email,
		nin,
	};

	const [formErrors, setFormErrors] = useState<FormError>(defaultForm);

	const validateForm = (cb: Function) => {
		try {
			vendorItemsSchema.parse(formData);
			setFormErrors(defaultForm);
			cb();
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errors: Record<keyof Form, string> = defaultForm;
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
		setFirstName,
		setLastName,
		setGender,
		setPhoneNumber,
		setDateOfBirth,
		setState,
		setLga,
		setEmail,
		setNin,
	};
};

export default useGuarantorDetails;
