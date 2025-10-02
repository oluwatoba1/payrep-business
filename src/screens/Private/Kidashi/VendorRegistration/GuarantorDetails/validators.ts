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
	relationship: string;
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
	relationship: string;
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
	relationship: "",
};

const useGuarantorDetails = () => {
	const [guarantorNumber, setGuarantorNumber] = useState<number>(1);
	const [guarantors, setGuarantors] = useState<IVendorGuarantor[]>([]);

	// Form states
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [gender, setGender] = useState<string>("");
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [dateOfBirth, setDateOfBirth] = useState<string | undefined>("");
	const [state, setState] = useState<string>("");
	const [lga, setLga] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [nin, setNin] = useState<string>("");
	const [relationship, setRelationship] = useState<string>("");

	const guarantorSchema = z.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		gender: z.string().min(1, "Gender is required"),
		phoneNumber: z
			.string()
			.min(1, "Phone number is required")
			.refine((val) => /^\d{11}$/.test(val), {
				message: "Phone number must be exactly 11 digits",
			}),
		dateOfBirth: z.string().min(1, "Date of birth is required"),
		state: z.string().min(1, "State is required"),
		lga: z.string().min(1, "LGA is required"),
		email: z.string().email("Invalid email").min(1, "Email is required"),
		nin: z
			.string()
			.min(1, "NIN is required")
			.refine((val) => /^\d{11}$/.test(val), {
				message: "NIN must be exactly 11 digits",
			}),
		relationship: z.string().min(1, "Relationship is required"),
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
		relationship,
	};

	const [formErrors, setFormErrors] = useState<FormError>(defaultForm);

	const clearForm = () => {
		setFirstName("");
		setLastName("");
		setGender("");
		setPhoneNumber("");
		setDateOfBirth("");
		setState("");
		setLga("");
		setEmail("");
		setNin("");
		setRelationship("");
		setFormErrors(defaultForm);
	};

	const addGuarantor = (guarantorData: IVendorGuarantor) => {
		setGuarantors([...guarantors, guarantorData]);
		if (guarantorNumber !== 2) {
			setGuarantorNumber(guarantorNumber + 1);
			clearForm();
		}
	};

	const validateForm = (cb: (guarantors: IVendorGuarantor[]) => void) => {
		try {
			guarantorSchema.parse(formData);
			setFormErrors(defaultForm);

			const guarantorData: IVendorGuarantor = {
				first_name: firstName,
				surname: lastName,
				other_name: "",
				phone: phoneNumber,
				relationship,
				nin,
				email,
				state_id: state,
				lga_id: lga,
				gender,
				dob: dateOfBirth ?? "",
				nationality: "NG", // Default to Nigeria
			};

			addGuarantor(guarantorData);

			cb([...guarantors, guarantorData]);
		} catch (error) {
			console.log(error);
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

	return {
		formData,
		formErrors,
		setGuarantors,
		guarantors,
		guarantorNumber,
		validateForm,
		clearFormError: (key: string) =>
			setFormErrors((errors) => ({ ...errors, [key]: "" })),
		setFirstName,
		setLastName,
		setGender,
		setPhoneNumber,
		setDateOfBirth,
		setState,
		setLga,
		setEmail,
		setNin,
		setRelationship,
	};
};

export default useGuarantorDetails;
