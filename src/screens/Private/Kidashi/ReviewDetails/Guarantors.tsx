import GuarantorReviewCard from "./GuarantorReviewCard";

interface GuarantorsProps {
	guarantors: IGuarantorDetails[];
	onEdit: () => void;
}

export default function Guarantors({ guarantors, onEdit }: GuarantorsProps) {
	return guarantors.map((guarantor, index) => (
		<GuarantorReviewCard
			key={index}
			guarantorDetails={guarantor}
			onEdit={onEdit}
		/>
	));
}
