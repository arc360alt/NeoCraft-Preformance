import Btn from "./Btn";

export default function BackButton({ onClick }: { onClick: () => void }) {
	return (
		<Btn className="normal back-btn" onClick={onClick}>
			&lt; Back
		</Btn>
	);
}
