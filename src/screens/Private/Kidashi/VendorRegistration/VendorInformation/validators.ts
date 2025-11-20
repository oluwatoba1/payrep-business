// src/screens/Private/Kidashi/VendorRegistration/VendorInformation/validators.ts
import { useState } from "react";
import * as z from "zod";

interface Form {
	businessType: string;
	state: string;
	lga: string;
	community: string;
}

interface FormError {
	businessType: string;
	state: string;
	lga: string;
	community: string;
}

const defaultForm = {
	businessType: "",
	state: "",
	lga: "",
	community: "",
};

const useVendorInformation = () => {
	const [businessType, setBusinessType] = useState<string>("");
	const [state, setState] = useState<string>("");
	const [lga, setLga] = useState<string>("");
	const [community, setCommunity] = useState<string>("");

	const vendorInfoSchema = z.object({
		businessType: z.string().min(1, "Business type is required"),
		state: z.string().min(1, "State is required"),
		lga: z.string().min(1, "LGA is required"),
		community: z.string().min(1, "Community is required"),
	});

	const formData = {
		businessType,
		state,
		lga,
		community,
	};

	const [formErrors, setFormErrors] = useState<FormError>(defaultForm);

	const clearForm = () => {
		setBusinessType("");
		setState("");
		setLga("");
		setCommunity("");
		setFormErrors({ ...defaultForm });
	}

	const validateForm = (cb: Function) => {
		try {
			vendorInfoSchema.parse(formData);
			setFormErrors({ ...defaultForm });

			const vendorData = {
				business_type: businessType,
				state_id: state,
				lga_id: lga,
				community,
			};

			cb(vendorData);
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errors: FormError = { ...defaultForm };
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
		validateForm,
		clearFormError: (key: keyof FormError) =>
			setFormErrors((prev) => ({ ...prev, [key]: "" })),
		setBusinessType,
		setState,
		setLga,
		setCommunity,
		clearForm,
	};
};

export default useVendorInformation;
